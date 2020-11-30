const emptyCatalog = { items: [] };

export default {
    actions: {
        async fetchCatalog(context) {
            const data = await fetch("./assets/data/catalog.json");
            const catalog = await data.json();
            const autors = unique(extractAutors(catalog));

            context.commit('updateCatalog', catalog);
            context.commit('updateAutors', autors);
        },
    },
    mutations: {
        updateCatalog(state, catalog) {
            state.catalog = catalog;
        },
        updateAutors(state, autors) {
            state.autors = autors;
        },
        createAutor(state, autor) {
            if (!state.autors.includes(autor)) {
                state.autors.push(autor);
            }
        },
        addTo(state, { id, value }) {
            const category = findCategoryById(state.catalog, id);
            if (category) {
                category.items.push(value);
            } else {
                throw `Category with id ${id} not found.`;
            }
        },
        updateBook(state, { isbn, data }) {
            const book = getBookWithPathByIsbn(state.catalog, isbn).book;

            book.title = data.title;
            book.isbn = data.isbn;
            book.autors = data.autors;
            book.description = data.description;
        },
        updateCategory(state, { id, data }) {
            const category = findCategoryById(state.catalog, id);

            category.title = data.title;
        },
        deleteCategory(state, id) {
            deleteCategoryById(state.catalog, id);
        },
        deleteBook(state, isbn) {
            deleteBookByIsbn(state.catalog, isbn);
        },

        addFilters(state, filters) {
            state.filters.push(...filters);
        },
        clearFilters(state, filters) {
            for(const filter of filters) {
                const index = state.filters.indexOf(filter);
                if(filter >= 0) {
                    state.filters.splice(index, 1);
                }
            }
        },
        updateFilter(state) {
            function itself(it) {
                return it
            }
            state.filters = itself(state.filters);
        }
    },
    state: {
        catalog: emptyCatalog,
        autors: [],
        filters: []
    },
    getters: {
        catalog: state => state.catalog,
        autors: state => state.autors,
        findBookWithPathByIsbn: state => isbn => getBookWithPathByIsbn(state.catalog, isbn),
        findCategoryById: state => id => findCategoryById(state.catalog, id),
        filteredCatalog: state => filterCatalog(state.catalog, state.filters) || emptyCatalog
    }
};

function isCategory(item) {
    return item.type === "category";
}

function isBook(item) {
    return item.type === "book";
}

/**
  * Delete category by its id
  * 
  * @param {{ id: string, items: Array }} category
  * @param {string} id 
  * @returns {boolean} true if category is deleted, false otherwise
  */
function deleteCategoryById(category, id) {
    for (let i = 0; i < category.items.length; i++) {
        const current = category.items[i];

        if (current.id === id) {
            category.items.splice(i, 1);
            return true;
        }

        if (isCategory(current) && deleteCategoryById(current, id)) {
            return true;
        }
    }

    return false;
}

/**
  * Finds category by its id
  * 
  * @param {{ id: string, items: Array }} category 
  * @param {string} id 
  * @returns {{ id: string, items: Array } | undefined} required category or undefined if category with that id is not exists
  */
function findCategoryById(category, id) {
    if (category.id === id) {
        return category;
    }

    for (const item of category.items) {
        if (isCategory(item)) {
            let result = findCategoryById(item, id);
            if (result) {
                return result;
            }
        }
    }

    return undefined;
}

/**
  * Returns book object with categories hierarchy (from root to closest)
  * 
  * @example 
  * let book = { type: "book", isbn: "123456786" }
  * let y = { type: "category", id: "Y", items: [book] }
  * let x = { type: "category", id: "X", items: [y] }
  * getBookWithPathByIsbn(x, "123456786") //=> { book: book, path: [x, y] }
  * 
  * @param {{ type: string, id: string, items: Array }} category 
  * @param {string} isbn 
  */
function getBookWithPathByIsbn(category, isbn) {
    if (!isCategory(category)) {
        return undefined;
    }

    for (const item of category.items) {
        if (isCategory(item)) {
            let bookAndPath = getBookWithPathByIsbn(item, isbn);

            if (bookAndPath) {
                bookAndPath.path.unshift(category);
                return bookAndPath;
            }
        } else if (isbn === item.isbn) {
            return { book: item, path: [category] };
        }
    }
}

/**
  * Delete book by its isbn
  *
  * @param {{ id: string, items: Array }} category
  * @param {string} isbn 
  * @returns {boolean} true if category is deleted, false otherwise
  */
function deleteBookByIsbn(category, isbn) {
    for (let i = 0; i < category.items.length; i++) {
        const current = category.items[i];

        if (isBook(current) && current.isbn === isbn) {
            category.items.splice(i, 1);
            return true;
        }

        if (isCategory(current) && deleteBookByIsbn(current, isbn)) {
            return true;
        }
    }

    return false;
}

/**
  * Returns array where all the values are unique
  * 
  * @param {any[]} array 
  * @returns {any[]} distinct array
  */
function unique(array) {
    return [...new Set(array)];
}

/**
 * Returns all autors in catalog
 * 
 * @param {{ id: string, items: Array } | { isbn: string, autors: string[] }} item book or category
 * @returns {string[]} autors array
 */
function extractAutors(item) {
    let autors = [];

    if (isCategory(item)) {
        for (let i of item.items) {
            autors.push(...extractAutors(i));
        }
    } else if (isBook(item)) {
        autors.push(...item.autors);
    }

    return autors;
}

/**
  * Fold using items applications
  * 
  * @param {{ id: string, items: Array }} catalog 
  * @param {Function[]} filters 
  */
 function filterCatalog(catalog, filters) {
    let filtered = catalog;

    for (const filter of filters) {
        filtered = applyFilter(filtered, filter);
    }

    return filtered;
}

/**
  * Creates a new tree using filter function
  * 
  * @param {{ id: string, items: Array }} catalog 
  * @param {Function} filter 
  */
function applyFilter(catalog, filter) {
    if(!catalog) {
        return catalog;
    }

    let items = [];

    for (const item of catalog.items) {
        if (isCategory(item)) {
            const filteredItem = applyFilter(item, filter);
            if (filteredItem) {
                items.push(filteredItem);
            }
        } else if (filter(item)) {
            items.push(item);
        }
    }

    if (items.length === 0) {
        return filter(catalog) ? {
            type: catalog.type,
            id: catalog.id,
            title: catalog.title,
            items: items
        } : null;
    }

    return {
        type: catalog.type,
        id: catalog.id,
        title: catalog.title,
        items: items
    };
}

const URL = "http://localhost:8080/api/v1/";

/* Generic API calls */

/**
 * Generic way of using GET REST API method to return all entities in JSON format.
 * Example: get("user", setUsers) <-- makes request to http://localhost:8080/api/v1/user and uses a "setUsers" function to assign response to array/object
 * @param {*} entity String name of entity to be retrieved
 * @param {*} func Function that will run with the data. Used to set local state to data which can be used to render components
 * @returns All requested entities in JSON format
 */
export async function get(entity, func) {
    fetch(URL + entity)
    .then(response => response.json())
    .then((data) => {
        func(data);
    })
}

/**
 * Generic way of using GET REST API method to return specific entity by ID.
 * @param {*} entity String name of entity type to be retrieved
 * @param {*} id Id of the entity to be retrieved
 * @param {*} func Function that will run with the data. Used to set local state to data which can be used to render components
 */
export async function getById(entity, id, func) {
    fetch (URL + entity + "/" + id)
    .then(response => response.json())
    .then((data) => {
        func(data);
    })
}

/**
 * Generic way of using GET REST API method to return specific entity by name.
 * @param {*} entity String name of entity type to be retrieved
 * @param {*} name Name of the entity to be retrieved
 * @param {*} func Function that will run with the data. Used to set local state to data which can be used to render components
 */
 export async function getByName(entity, name, func) {
    fetch (URL + entity + "/name?name=" + name)
    .then(response => response.json())
    .then((data) => {
        func(data);
    })
}

/**
 * Generic way of using POST REST API method to create a new entity
 * Also updates state with newly added value
 * @param {*} body Object representing the entity to be added. All attributes must match for successful operation.
 * @param {*} entity Entity string name to customize the URL to which the request is made
 * @param {*} setState State setter that will be used to update state with newly added record
 * @returns HTTP response
 */
 export async function post(body, entity, setState) {
    return fetch(URL + entity, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (!response.status === 200) {
            return response.status;
        }
        return response.json();
    })
    .then(data => {
        setState(prev => [...prev, data]);
    })
    .catch(error => console.log(error));
}

/**
 * Generic way of using PUT REST API method to update a given entity record
 * @param {*} id Id of the entity to be edited
 * @param {*} body Object representing entity; attributes should be made to reflect desired changes
 * @param {*} entity Entity string name to customize URL to which the request is made
 * @param {*} setState Setter that will be used to update state with newly added record
 * @returns HTTP response error if unsuccessful
 */
export async function put(id, body, entity, setState) {
    return fetch(URL + entity + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (!response.status === 200) {
            return response.status;
        }
        return response.json();
    })
    .then(data => {
        setState(data);
    })
    .catch(error => console.log(error));
}

/**
 * Generic way of using DELETE REST API method to remove a given entity record
 * @param {*} id Id of the entity to be removed
 * @param {*} entity Entity string name to customize URL to which the request is made
 * @returns HTTP response error if unsuccessful
 */
export async function deleteById(id, entity) {
    return fetch(URL + entity + "/" + id, {
        method:"DELETE"
    })
        .then(response => {
            if (!response.status === 200) {
                return response.status
            }
        })
        .catch(error => console.log(error))
}

/* Specific API calls */
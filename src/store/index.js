import axios from 'axios'
// import {keep} from './keep'
// import {vault} from './vault'

let api = axios.create({
    baseURL: 'https://keeepr.herokuapp.com/api/',
    timeout: 2000,
    withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
    loading: false,
    user: {},
    myVaults: {},
    myKeeps: {},
    activeVault: {},
    vaultKeeps: [],
    //Dummy Data
    keeps: [],
    error: {}
}

let handleError = (err) => {
    state.error = err
    state.loading = false
}

export default {
    // ALL DATA LIVES IN THE STATE
    state,
    // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
    actions: {
        login(email, password) {
            state.loading = true
            api.post('login', {
                email: email,
                password: password
            }).then(res => {
                state.user = res.data.data
                state.loading = false
            }).catch(handleError)
        },
        register(username, email, password) {
            state.loading = true
            api.post('register', {
                name: username,
                email: email,
                password: password,
            }).then(res => {
                this.login(email, password)
            }).catch(handleError)
        },
        logout() {
            api.delete('logout').then(res => {
                state.user = {}
            }).catch(handleError)
        },
        authenticate() {
            state.loading = false
            api('authenticate').then(res => {
                if (res.data.data) {
                    state.user = res.data.data
                    state.loading = false
                }
            }).catch(handleError)
        },
        getKeeps() {
            // CUSTOM: only returns public keeps
            api('keeps/public').then(res => {
                console.log(res.data)
                state.keeps = res.data.data
                return state.keeps
            }).catch(handleError)
        },
        getKeepsInVault(vaultId) {
            // return keeps in activeVault
            console.log(vaultId)
            api('vaults/' + vaultId + '/keeps').then(res => {
                console.log(res.data)
                state.vaultKeeps = res.data.data
            }).catch(handleError)
        },
        getDashboard(cb) {
            // returns your keeps and vaults
            api('dashboard').then(res => {
                console.log(res.data)
                state.myKeeps = res.data.data.keeps
                state.myVaults = res.data.data.vaults
                setTimeout(cb, 500)
            }).catch(handleError)
        },
        createKeep(keep) {
            console.log("alrighty then")
            api.post('/keeps', keep).then(res => {
                state.myKeeps.push(res.data.data)
                Materialize.toast(`Added new keep!`, 5000)
            }).catch(handleError)
        },
        // only in dashboard
        removeKeep(keepId) {
            api.delete('/keeps/' + keepId).then(res => {
                console.log(res.data)
                Materialize.toast(`Removed keep`, 5000)
            }).catch(handleError)
        },
        // Extra
        makePublic(keepId) {
            api.put('/keeps/' + keepId + '/public').then(res => {
                console.log(res.data)
            }).catch(handleError)
        },
        makePrivate(keepId) {
            api.put('/keeps/' + keepId + '/private').then(res => {
                console.log(res.data)
            }).catch(handleError)
        },
        createVault(vault) {
            api.post('/vaults', vault).then(res => {
                console.log(res.data)
                Materialize.toast(`Created new vault!`, 5000)
                state.myVaults.push(res.data.data)
            }).catch(handleError)
        },
        removeVault(vaultId) {
            api.delete('/vaults/' + vaultId).then(res => {
                console.log(res.data)
                Materialize.toast(`Removed vault`, 5000)
            }).catch(handleError)
        },
        addKeepToVault(keep, vault) {
            api.put('/vaults/' + vault._id + '/addKeep', keep).then(res => {
                console.log(res.data)
                Materialize.toast(`Added`, 5000)
            })
        },
        removeKeepFromVault(keep, vaultId) {
            api.put('/vaults/' + vaultId + '/removeKeep', keep).then(res => {
                console.log(res.data)
                this.getKeepsInVault(vaultId)
            })
        }
    }
}


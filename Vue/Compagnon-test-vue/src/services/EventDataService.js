// services/eventDataService.js
import { database } from "../../firebase.js";
import { ref, push, update, remove, onValue } from "firebase/database";

class eventDataService {
    constructor() {
        // la méthode ref de firebase est differente de ref en vue 
        // Ref de firebase permet de faire référence à la base de données firebase
        // "events" est le nom de la collection dans la base de données firebase
        this.dbRef = ref(database, "events");
    }

    // Obtenir tous les events
    getAll(callback) {
        onValue(this.dbRef, callback);
    }

    // Ajouter un event
    create(event) {
        return push(this.dbRef, event);
    }

    // Mettre à jour un event
    update(id, event) {
        return update(ref(database, `events/${id}`), event);
    }

    // Supprimer un event
    delete(id) {
        return remove(ref(database, `events/${id}`));
    }

    // Supprimer tous les events
    deleteAll() {
        return remove(this.dbRef);
    }
}

// Exporter une instance unique
export default new eventDataService();
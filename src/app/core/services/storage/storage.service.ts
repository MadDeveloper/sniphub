import { Injectable } from '@angular/core'

@Injectable()
export class StorageService {
    private storage = localStorage

    namespace(name: string) {
        const namespaceStorage = this.storage.getItem(name)

        if (!namespaceStorage) {
            this.storage.setItem(name, JSON.stringify({}))

            return {}
        }

        return JSON.parse(namespaceStorage)
    }

    find(namespace: string, path: string) {
        return this.namespace(namespace)[path]
    }

    delete(namespace: string, path: string) {
        const namespaceStorage = this.namespace(namespace)

        delete namespaceStorage[path]
        this.update(namespace, namespaceStorage)
    }

    deleteNamespace(namespace: string) {
        this.storage.removeItem(namespace)
    }

    update(namespace: string, data: any) {
        if (namespace) {
            const namespaceStorage = this.namespace(namespace)
            const newNamespaceStorage = Object.assign({}, namespaceStorage, data)

            this.storage.setItem(namespace, JSON.stringify(newNamespaceStorage))
        } else {
            throw new Error('[Storage:update] A namespace must be provided')
        }
    }
}

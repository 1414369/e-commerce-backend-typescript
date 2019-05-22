import { productsController } from "@/_controllers";

export class Pokemons {
    public routes(app): void {

        app.route('/pokemons')
            .get(productsController.getAllProducts)

        app.route('/pokemons/:id')
            .get(productsController.getProductsById)
    }
}
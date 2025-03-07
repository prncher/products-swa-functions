import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

interface Product {
  id: number;
  department: string;
  name: string;
  price: string;
}

const products: Product[] = [
  {
    id: 1,
    department: 'auto',
    name: 'Oil Filter',
    price: '7.89'
  },
  {
    id: 2,
    department: 'auto',
    name: 'Engine Oil',
    price: '22.99'
  },
  {
    id: 3,
    department: 'auto',
    name: 'Wiper Blade',
    price: '4.99'
  },
  {
    id: 4,
    department: 'home',
    name: 'Floor mat',
    price: '9.79'
  },
  {
    id: 5,
    department: 'home',
    name: 'Sofa throws',
    price: '17.99'
  },
  {
    id: 6,
    department: 'sportswear',
    name: 'Jacket',
    price: '48.99'
  },
  {
    id: 7,
    department: 'sportswear',
    name: 'Running shoe',
    price: '89.99'
  }
]

export async function getProducts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const department = request.params.department;
  const productId = Number(request.params.id);
  let selection: Product[] = products;
  if (!isNaN(productId)) {
    if (productId < 1 || productId > 7) {
      return {
        status: 400,
        jsonBody: 'id must be between 1 and 7'
      };
    }
    selection = selection.filter(p => p.id === productId);
  }

  // passing an optional parameter in a route
  if (department && department !== 'undefined') {
    selection = selection.filter(s => s.department === department)
  }

  return { jsonBody: selection };
};

app.http('products', {
  methods: ['GET', 'POST'],
  authLevel: 'function',
  route: 'products/{department:alpha?}/{id:int?}',
  handler: getProducts
});

import React from 'react';
import {
  App,
  Cell,
  Columns,
  Error,
  Label,
  OuterContainer,
  RowOfCells,
  Select
} from './styled';

interface Product {
  id: number;
  department: string;
  name: string;
  price: string;
}

const code = '' // Set the host key.

function ProductsApp() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [departments, setDepartments] = React.useState<Array<String>>([])
  const [error, setError] = React.useState<Response>()
  const [department, setDepartment] = React.useState<String | undefined>()
  const [productIds, setProductIds] = React.useState<Array<number>>([])
  const [productId, setProductId] = React.useState<number | undefined>()
  const [initialized, setInitialized] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    (async () => {
      try {
        const url = `http://localhost:7071/api/products?code=${code}`;
        const response = await fetch(url);
        switch (response.status) {
          case 400:
            const reason = await response.json();
            setError({ ...response, statusText: reason });
            break;
          case 200: {
            const products = await response.json();
            setProducts(products);
            const depts: Set<string> = new Set(products.map((p: Product) => p.department));
            setDepartments(['none', ...depts]);
            const productIds = products.map((p: Product) => p.id);
            setProductIds(['NaN', ...productIds]);
            setInitialized(true);
            break;
          }
          default:
            setError(response);
        }
      }
      catch (e) {
        setError(new Response(e as BodyInit));
        console.log(e)
      }
    })();
  }, [])

  React.useEffect(() => {
    (async () => {
      if (!initialized){
        return;
      }
      let url = 'http://localhost:7071/api/products';
      try {
        if (department || productId) {
          url = url.concat(department ? `/${department}` : `/undefined`);
          url = url.concat(productId ? `/${productId}` : ``);
        }

        const response = await fetch(`${url}?code=${code}`);
        switch (response.status) {
          case 400:
            const reason = await response.json();
            setError({ ...response, statusText: reason });
            break;
          case 200: {
            const products = await response.json();
            setProducts(products);
            break;
          }
          default:
            setError(response);
        }
      }
      catch (e) {
        setError(new Response(e as BodyInit));
        console.log(e)
      }
    })();
  }, [department, productId, initialized])

  const ProductDetails = (product: Product) => {
    return <>
      {Object.values(product).map((v, i) => <Cell key={i}>{v}</Cell>)}
    </>
  }

  const ProductHeader = () => {
    const keys = ['id', 'department', 'name', 'price($)'];
    return <>
      {keys.map(h => <Cell key={h}>{h}</Cell>)}
    </>
  }

  const ProductFilter = (): React.ReactNode => {
    return <>
      <h4>Filter Products</h4>
      <Columns>
        <Label htmlFor={'departments'}>Select a department to filter</Label>
        <Select
          onChange={e => setDepartment(e.target.value)}
          title='select a department to filter'
          name="departments"
          id="departments">
          {departments.map((d, i) =>
            <option key={i} value={d === 'none' ? '' : d as string}>{d}</option>
          )}
        </Select>
      </Columns>
      <Columns>
        <Label htmlFor={'productIds'}>Select product id to filter</Label>
        <Select
          onChange={e => setProductId(Number(e.target.value))}
          title='select a product id to filter'
          name="productIds"
          id="productIds">
          {productIds.map(d =>
            <option key={d} value={d}>{d}</option>
          )}
        </Select>
      </Columns>
    </>
  }

  return (
    <>{
      error ? <Error>{error.statusText}</Error> :
        <App>
          {ProductFilter()}
          {products && products.length ? <OuterContainer>
            <RowOfCells $bgcolor='#acacac'>{ProductHeader()}</RowOfCells>
            {products.map(p => <RowOfCells $bgcolor='' key={p.id}>{ProductDetails(p)}</RowOfCells>)}
          </OuterContainer>: <>No Products</>}
        </App>
    }
    </>
  );
}

export default ProductsApp;

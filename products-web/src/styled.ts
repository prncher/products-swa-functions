import styled from "styled-components";

const App = styled.div`
  background-image: url('products.jpg');
  background-size: cover;
  width:100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
`

const Error = styled.div`
  background-image: url('products.jpg');
  background-size: cover;
  width:100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
`

const OuterContainer = styled.div`
  background: #d5d7df;
  margin: 5px 0;
  border: 1px solid #999;
`

const RowOfCells = styled.div.attrs<{ $bgcolor: string }>(props => ({
  $bgcolor: props.$bgcolor
}))`
  display: grid;
  grid-template-columns: 50px 200px 250px 140px;
  border-bottom: 1px solid #fff;
  background-color: ${props => `${props.$bgcolor}`};
  text-transform: ${props => `${props.$bgcolor.length ? 'capitalize' : ``}`};
`

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  margin: 5px;
`

const Cell = styled.div`
  display: flex;
  padding: 5px;
  justify-content: start;
`

const Label = styled.label`
padding: 5px 0;
`

const Select = styled.select`
padding: 5px 0;
background-color: #acacac;
`

export {
  App,
  Error,
  OuterContainer,
  RowOfCells,
  Columns,
  Cell,
  Label,
  Select
}
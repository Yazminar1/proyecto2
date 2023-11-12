const inputProduct = document.getElementById("inputProducto");
const productDiv = document.getElementById("productos");

let productList = JSON.parse(localStorage.getItem("productLocalStorage")) || [];
let indexEditar = null

console.log(productDiv)
console.log(inputProduct)
console.log(productList)

class Product{
    constructor(producto){
      this.producto = producto;
    }
}
//? Esta función tiene dos comportamientos derivado del boton
const saveProduct = () => {
    let producto = inputProduct.value;
    let product = new Product(producto);
    if(indexEditar === null){
     //! Esta función agrega un producto al arreglo de localstorage
     console.log("Agregar producto");
     productList.push(product);
      //! Esta función agrega un producto al arreglo de localstorage
    } else {
      productList[indexEditar] = product;
      indexEditar = null;
      console.log("Editar producto");
    }
    clearForm();
     //* Aquí pasamos un arreglo modificado al localstorage y una vez modificado se renderiza
    localStorage.setItem("productLocalStorage", JSON.stringify(productList));
    renderList();
  }

  const clearAll = () => {
    localStorage.clear();
    productList = [];
    alert("Sin productos");
  }

//* Se elimina cada producto
  const deleteProduct = (index) => {
    productList.splice(index, 1);
    localStorage.setItem("productLocalStorage", JSON.stringify(productList));
    renderList();
  }
//* Se edita cada producto
  const editProduct = (index) => {
    let productToEdit = productList[index];
    inputProduct.value = productToEdit.producto;
    indexEditar = index;
  }
  //* Esta función evalua si existen tareas y si existen las muestra en pantalla
  const renderList = () => {
    if(productList.length === 0){
      productDiv.innerHTML = `
        <div>
          no hay productos
        </div>
      `;
    } else {
      productDiv.innerHTML = "";
      productList.forEach(({producto}, index) => {
        productDiv.innerHTML += `
          <div>
            <h3>${producto}</h3>
            <button type="button" id="edit-${index}" onclick="editProduct(${index})">Editar</button>
            <button type="button" id="delete-${index}" onclick="deleteProduct(${index})">Eliminar</button>
          </div>
        `;
      });
    }
  }
  //? Esta función limpia el/los input(s) por experiencia de usuario
const clearForm = () => {
    inputProduct.value = "";
  }
  
  renderList();
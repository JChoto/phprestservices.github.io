
var con = document.querySelector('#doc'); //Listar productos
var con2 = document.querySelector('#doc2'); //Buscar producto
var con4 = document.querySelector('#doc4');  //Actualizar producto

 
var mensaje = document.querySelector('#mensajes');  //Mensajes de accion
 



function listarAllProductos() {
    
    
    //Petición
    
    fetch('https://api-php-prueba.danny-usca.com/controller/categoria.php?op=GetAll')
    .then(resp => resp.json())
    .then(dat =>{
        
        
    //Respuesta
        
        console.log(dat);
        var c = 0;

        con.innerHTML = ''; 
       
        do {           
          
            con.innerHTML+=`
            <button type="button" onclick="guardarId(${dat[c]['id']},'${dat[c]['nombre']}',${dat[c]['precio']})" class="btn btn-primary">Editar</button>
            <button type="button" onclick="eliminarId(${dat[c]['id']})" class="btn btn-danger">Eliminar</button>
            <label>${dat[c]['id']} : ${dat[c]['nombre']}</label> 
            <br>
            `;
            
            
        } while (dat.length != ++c);
        
        
        

    });
    
}//End function listarAllProductos


function listarIdProducto() {
    
    
    var idReceive = document.getElementById("name").value;
    var data = {"id":idReceive};
    
     //Petición
    
    fetch('https://api-php-prueba.danny-usca.com/controller/categoria.php?op=GetId', {
     method: 'POST',
    body: JSON.stringify(data)
        
    })
    .then(resp => resp.json())
    .then(dat =>{
        
        if(dat.length==0){
            swal({
        icon: 'error',
        title: 'Error: no existe producto con ese id',
        timer: 1500
    });
     
         
            return
            
        }
     
        con2.innerHTML = '';
        con2.innerHTML+=`
            
           <label>${dat[0]['id']} : ${dat[0]['nombre']} = $ ${dat[0]['precio']}</label>

            `;

    });
    
}//End function listarIdProducto


function insertProducto() {
  
    
     var nombreReceive = document.getElementById("nombre").value;
     var precioReceive = document.getElementById("precio").value;
     
    var data = {"nombre":nombreReceive,"precio":precioReceive};
    
    
    //Petición
    
     fetch('https://api-php-prueba.danny-usca.com/controller/categoria.php?op=Insert', {
     method: 'POST',
    body: JSON.stringify(data)
        
    })
    .then(resp => resp.json())
    .then(dat =>{
        
        
    //Respuesta
    
       listarAllProductos();
       
          swal({
        icon: 'success',
        title: 'Producto ingresado correctamente',
        timer: 1500
    });
     
       
    });
    
}//End function insertProducto


function updateProducto() {
   
    
     var idReceive1 = document.getElementById("id2").value;
     var nombreReceive1 = document.getElementById("nombre2").value;
     var precioReceive1 = document.getElementById("precio2").value;
     
    var data = {"id":idReceive1,"nombre":nombreReceive1,"precio":precioReceive1};
    
    
    //Petición
    
     fetch('https://api-php-prueba.danny-usca.com/controller/categoria.php?op=Update', {
     method: 'POST',
    body: JSON.stringify(data)
        
    })
    .then(resp => resp.json())
    .then(dat =>{
        
        
    //Respuesta
        
        console.log(dat);
    
       listarAllProductos();
       
       swal({
        icon: 'success',
        title: 'Producto actualizado correctamente',
        timer: 1500
    });
     
       
    });
    
}//End function updateProducto()


function guardarId(idSelect, nombreSelect, precioSelect){
    
    window.scrollBy(0,500);
    
    con4.innerHTML = '';
    
    con4.innerHTML+=`
    <input type="text" id="id2" name="id2" value="${idSelect}" disabled><br>
    <input type="text" id="nombre2" name="nombre2" value="${nombreSelect}"><br> 
    <input type="text" id="precio2" name="precio2" value="${precioSelect}"> <br><br>

    <button type="button" onclick="updateProducto()" class="btn btn-primary">Actualizar</button>
    `;
    
    
}//End guardarId()


function eliminarId(idSelect) {
    
   
     
    var data = {"id":idSelect};
   
    //Petición
    
     fetch('https://api-php-prueba.danny-usca.com/controller/categoria.php?op=Delete', {
     method: 'POST',
    body: JSON.stringify(data)
        
    })
    .then(resp => resp.json())
    .then(dat =>{
      
        
    //Respuesta
       
       listarAllProductos();
   swal({
        icon: 'success',
        title: 'Producto eliminado!',
        timer: 1500
    });
     
       
    });
    
}//End function deleteProducto()


function crearPdf() {
     var doc = new jsPDF();
     
     doc.text("Tabla de productos!", 10, 10);
     doc.text("Datos obtenidos a traves de un Servicio Web RESTful!", 10, 20);
     doc.text("Tabla referencia: tabla_imagen", 10, 30);
     
      fetch('https://api-php-prueba.danny-usca.com/controller/categoria.php?op=GetAll')
    .then(respo => respo.json())
    .then(datas =>{
        
      let header = ["id","nombre","precio"];
      let headerConfig = header.map(key=>({ 
      'name': key,
      'prompt': key,
      'width':50,
      'align':'center',
      'padding':0}));
    
           doc.table(10, 40, datas, headerConfig);
           swal({
        icon: 'success',
        title: 'Pdf creado exitosamente!',
        timer: 1500
    });
     
    
    doc.save("a4.pdf");
    });
       
      
     


}//End crearPdf
 









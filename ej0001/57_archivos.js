function comenzar(){
    zonadatos=document.getElementById("zonadatos");
    var boton=document.getElementById("boton");
    boton.addEventListener("click",crear,false);
    navigator.webkitPersistentStorage.requestQuota(5*1024*1024,acceso);
}
function acceso(){
    window.webkitRequestFileSystem(PERSISTENT,5*1024*1024,crearsis,errores);
}
function crearsis(sistema){
    espacio=sistema.root;
    ruta="";
    mostrar();
}
function crear(){
    var nombrearchivo=document.getElementById("entrada").value;
    console.log("nombre archivo: "+nombrearchivo);
    
    if(nombrearchivo!=""){
        nombrearchivo=ruta+nombrearchivo;
        espacio.getFile(nombrearchivo,{create:true, exclusive:false},mostrar,errores);
    }
}
function mostrar(entrada){
    document.getElementById("entrada").value="";
    zonadatos.innerHTML="";
/*     zonadatos.innerHTML="¡Exito en la creación del archivo! <br>"
    zonadatos.innerHTML+="Nombre: "+entrada.name+"<br>"
    zonadatos.innerHTML+="Ruta: "+entrada.fullPath+"<br>"
*/
espacio.getDirectory(ruta,null,leerdir,errores);
}
function leerdir(dir){
    lector=dir.createReader();
    leer();
}
function leer(){
    lector.readEntries(function(archivos){
        if(archivos.length){listar(archivos)}
    },errores);
}
function listar(archivos){
    for (var i=0;i<archivos.length;i++){
        if (archivos[i].isFile){
            zonadatos+=archivos[i].name+"<br>";
        }else if (archivos[i].isDirectory){
            zonadatos.innerHTML+="<span class='directorio'>"+archivos[i].name+"</span><br>";
        }
    }
}
function errores(e){
    alert("Ha habido un error: "+e.code+", "+e.name);
}
window.addEventListener("load",comenzar,false);
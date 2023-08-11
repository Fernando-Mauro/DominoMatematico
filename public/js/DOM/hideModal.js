export const hideModal = (idModal) => {

    const container = document.querySelector(`#${idModal}`);
    const modal = new Modal(container);
    
    try{
        modal.hide();
    }catch(err){
        console.error(`Hubo un error al intentar ocultar el modal ${err}`);
    }

    try{
        document.querySelector("[modal-backdrop]").remove();
    }catch(err){
        console.error(`Hubo un error al intentar ocultar el modal ${err}`);
    }   
};
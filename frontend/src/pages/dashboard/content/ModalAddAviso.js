import React from 'react';

export default function ModalAddAviso() {
    return (
        <div id="add_mens" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header login-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Adicionar Aviso</h4>
                    </div>
                    <div className="modal-body">
                        <input type="text" placeholder="Título" name="name"/>
                        <textarea placeholder="Mensagem"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-black" data-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
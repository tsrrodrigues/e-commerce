import React from 'react';

export default function ModalAddAviso() {
    return (
        <div id="add_mens" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Adicionar Aviso</h4>
                    </div>
                    <form>
                        <div className="modal-body">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Título" 
                                    className="form-control" 
                                    name="title" 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    placeholder="Mensagem" 
                                    className="form-control" 
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-black" data-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-danger" data-dismiss="modal">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
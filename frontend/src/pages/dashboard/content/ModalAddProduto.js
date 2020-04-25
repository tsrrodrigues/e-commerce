import React from 'react';

export default function ModalAddProduto() {
    return (
        <div id="add_product" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header login-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Adicionar Produto</h4>
                    </div>
                    <div className="modal-body">
                        <input type="text" placeholder="Nome do produto" name="name"/>
                        <input type="text" placeholder="Categoria" name="mail"/>
                        <input type="text" placeholder="Preço" name="passsword"/>
                        <textarea placeholder="Descrição"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-black" data-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
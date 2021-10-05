import NovoLeilao from '@/views/NovoLeilao';
import { mount } from '@vue/test-utils';
import { createLeilao } from '@/http';

jest.mock('@/http');

const $router = {
    push: jest.fn()
};
// o push é uma função, mas não importa implementá-la
// só chama o jest e informa que é uma função = jest.fn()

describe('Um novo leilão deve ser criado', () => {
    test('dado um formulario preenchido, um leilão deve ser criado', () => {
        createLeilao.mockResolvedValueOnce();

        const wrapper = mount(NovoLeilao, {
            mocks: {
                $router
            }
        });
        // passamos o $router para dentro do mount

        wrapper.find('.produto').setValue('Um livro da casa do código');
        wrapper.find('.descricao').setValue('Conteúdo de primeira');
        wrapper.find('.valor').setValue(50);
        wrapper.find('form').trigger('submit')

        expect(createLeilao).toHaveBeenCalled();
        // espera que o createLeilao foi chamado
    });
});

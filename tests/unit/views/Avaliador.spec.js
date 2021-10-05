import Avaliador from '@/views/Avaliador';
import { mount, RouterLinkStub } from '@vue/test-utils';
// RouterLinkStub = é o dublê/esboço do link do VueRouter
import { getLeiloes } from '@/http';
import flushPromises from 'flush-promises';

jest.mock('@/http');

const leiloes = [
    {
        produto: 'Livro da Casa Código',
        lanceInicial: 50,
        descricao: 'Livro sobre VueJS'
    },
    {
        produto: 'Livro da Casa Código',
        lanceInicial: 50,
        descricao: 'Livro sobre Teste Unitário'
    }
];

describe('Um avaliador que se conecta com a API', () => {
    test('mostra todos os leiloes retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce(leiloes);
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        await flushPromises();
        const totalDeLeiLoesExibidos = wrapper.findAll('.leilao').length;
        expect(totalDeLeiLoesExibidos).toBe(leiloes.length);
    });
    // mockamos o retorno do nosso leiloes 
    // montamos o avaliador
    // aguardamos pela promise do getLeiloes ser resolvida
    // contamos quantos elementos com essa classe existe
    // e garantimos que os elementos exibidos tenha a mesma quantidade
    // de leiloes definida 

    test('não há leiloes retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce([]);
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        await flushPromises();
        const totalDeLeiLoesExibidos = wrapper.findAll('.leilao').length;
        expect(totalDeLeiLoesExibidos).toBe(0);
    });
});

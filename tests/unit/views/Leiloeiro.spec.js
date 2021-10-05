import Leiloeiro from '@/views/Leiloeiro';
import { mount } from '@vue/test-utils';
import { getLeilao, getLances } from '@/http';
import flushPromises from 'flush-promises';
// esse método faz com que o teste aguarde as chamadas serem resolvidas antes de seguir

jest.mock('@/http');
// simular a chamada http

const leilao = {
    produto: 'Um livro da casa do código',
    lanceInicial: 50,
    descricao: 'Livro bem bacana sobre VUE'
};

const lances = [
    {
        id: 1,
        valor: 1001,
        data: '2021-09-19T18:04:26.826Z',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 1005,
        data: '2021-09-19T18:04:26.826Z',
        leilao_id: 2
    },
    {
        id: 3,
        valor: 1099,
        data: '2021-09-19T18:04:26.826Z',
        leilao_id: 3
    },
];

describe('Leiloeiro inicia um leilão que não possui lances', () => {
    test('avisa quando não existem lances', async () => {
        getLeilao.mockResolvedValueOnce(leilao);
        // ele simula o método http e retorna o que pedidos
        getLances.mockResolvedValueOnce([]);
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });
        await flushPromises();        
        const alerta = wrapper.find('.alert-dark');
        expect(alerta.exists()).toBe(true);
    });
    // montamos o componente e controlamos o retorno dele através do mock
    // quando o getLeilao for chamado, vai retornar o leilao que definimos
    // quando o getLances for chamado, vai retornar um array vazio já que não
    //existe lance inicial
});

describe('um leiloeiro exibe os lances existentes', () => {
    test('não mostra o aviso de "sem lances"', async () => {
        getLeilao.mockResolvedValueOnce(leilao);        
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });

        await flushPromises(); 
        const alerta = wrapper.find('.alert-dark');       
        expect(alerta.exists()).toBe(false);
    });    

    test('leiloeiro possui uma lista de lances', async () => {
        getLeilao.mockResolvedValueOnce(leilao);    
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });
        await flushPromises(); 
        const alerta = wrapper.find('.list-inline');       
        expect(alerta.exists()).toBe(true);
    });
});

describe('um leiloeiro comunica os valores de menor e maior lance', () => {
    test('mostra o maior lance daquele leilao', async () => {
        getLeilao.mockResolvedValueOnce(leilao);    
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });
        await flushPromises(); 
        const maiorLance = wrapper.find('.maior-lance'); 
        expect(maiorLance.element.textContent).toContain(`Maior lance: R$ 1099`);
    });

    test('mostra o menor lance daquele leilao', async () => {
        getLeilao.mockResolvedValueOnce(leilao);    
        getLances.mockResolvedValueOnce(lances);

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        });
        await flushPromises(); 
        const menorLance = wrapper.find('.menor-lance'); 
        expect(menorLance.element.textContent).toContain(`Menor lance: R$ 1001`);        
    });
});

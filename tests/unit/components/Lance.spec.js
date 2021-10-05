import Lance from '@/components/Lance';
import { mount } from '@vue/test-utils';

test('não aceita lance com valor menor do que zero', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');
    input.setValue(-100);
    const lancesEmitidos = wrapper.emitted('novo-lance');
    wrapper.trigger('submit');
    expect(lancesEmitidos).toBeUndefined;
});

// este teste garante que os lances emitidos não estão sendo preenchidos em caso de valores negativos

test('emite um lance quando o valor é maior do que zero', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');
    input.setValue(100);
    wrapper.trigger('submit');
    const lancesEmitidos = wrapper.emitted('novo-lance');    
    expect(lancesEmitidos).toHaveLength(1);
});

// nesse teste o input é válido
// 100 é um valor que ele espera
// ativa a submissão do form usando o trigger 
// garantimos que os lances emitidos tenham o tamanho de 1


test('emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance);
    const input = wrapper.find('input');
    input.setValue(100);
    wrapper.trigger('submit');
    const lancesEmitidos = wrapper.emitted('novo-lance');
    // resultado do wrapper é um array de arrays [ [100] ]
    const lance = parseInt(lancesEmitidos[0][0]);
    expect(lance).toBe(100);
});

// O parseInt() analisa um argumento string e retorna um inteiro na base especificada;

describe('um lance com valor mínimo', () => {
    test('todos os lances devem possuir um valor maior do que o mínimo informado', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input');
        input.setValue(400);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        expect(lancesEmitidos).toHaveLength(1)
    });

    // definimos um valor mínimo de 300
    // encontramos o elemento input
    // definimos que o lance dado é 400, um lance válido
    // ativamos o submmit através do trigger
    // capturamos as emissões do evento do novo lance
    // estamos esperando o valor de 1, pq o valor informado é válido

    test('emite um valor esperado de um lance válido', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input');
        input.setValue(400);
        wrapper.trigger('submit');
        const lancesEmitidos = wrapper.emitted('novo-lance');
        const valorDoLance = parseInt(lancesEmitidos[0][0]);
        expect(valorDoLance).toBe(400)

        // validar se o valor do lance realmente é realmente 400
        // parseInt do lance emitido na posição zero
        // o emitted retorna um array de arrays [[ 400]]
    });

    test('não são aceitos lances com o valor menor do que o mínimo ofertado', async () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        });
        const input = wrapper.find('input');
        input.setValue(100);
        wrapper.trigger('submit');
        await wrapper.vm.$nextTick()
        const msgErro = wrapper.find('p.alert').element;
        expect(msgErro).toBeTruthy();

        // <p class="alert alert-danger" role="alert"> o wrapper encontra seletor css
        // usamos async await pq a renderização do DOM é assíncrona
        // se não usarmos o teste dá erro, retorna um undefined
        // temos que esperar e chamar uma função do Vue que vai garantir
        // que o DOM já tenha sido atualizado
        // vm.$nextTick = aguardando que o DOM seja atualizado 
        // ele adia o callback para ser executado depois do próximo ciclo de atualização do DOM
        // vm = ViewModel -> instância Vue
        // e então pedimos para o wrapper encontrar a msg de erro
    });
});

/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
let addBlock = homeworkContainer.querySelector('#add-block');

let result = [];

filterNameInput.addEventListener('keyup', function (e) {
    let chunk = e.target.value;
    let tr = document.createElement('tr');
    let sortNames = [];

    chunk = chunk.toLowerCase();
    result.forEach(obj => {
        if (obj.name.includes(chunk)) {
            sortNames.push(obj)
        }
    });
    if (listTable.children.length > 0) {
        for (let i = 0; i < listTable.children.length; i++) {
            let el = listTable.children[i];

            if (el.tagName === 'TR') {
                el.remove();
            }
        }
    }
    if (chunk.length > 0) {
        if (sortNames.length > 0) {
            sortNames.forEach(obj => {
                tr.innerHTML = `<td>${obj.name}</td><td>${obj.value}</td><td><button>Remove</button></td>`;
                listTable.appendChild(tr);
            });
        }
    }
});

addButton.addEventListener('click', () => {
    let obj = {
        name: '',
        value: '',
    };

    if (addBlock.children.length > 2) {
        for (let i = 0; i < addBlock.children.length; i++) {
            let el = addBlock.children[i];

            if (el.tagName === 'P') {
                el.remove();
            }
        }
    }
    if (addNameInput.value.length > 0) {
        obj.name = addNameInput.value;
        obj.value = addValueInput.value;
        document.cookie = `${obj.name}=${obj.value}`;
        result.push(obj);
        listTable.innerHTML += `<tr><td>${obj.name}</td><td>${obj.value}</td><td><button>Remove</button></td></tr>`;
        addNameInput.value = '';
        addValueInput.value = '';
    } else {
        let p = document.createElement('p');

        p.textContent = 'Please enter name';
        p.style.color = 'red';
        addBlock.appendChild(p);

        return false;
    }
});

listTable.addEventListener('click', (e) => {
    let buttons = listTable.querySelectorAll('button');

    buttons.forEach(button => {
        if (button === e.target) {
            e.target.parentNode.parentNode.remove();
            let name = e.target.parentNode.parentNode.firstChild.textContent;
            let value = e.target.parentNode.parentNode.firstChild.nextSibling.textContent;
            let date = new Date();
            let idx = result.indexOf(name);

            if (idx !== -1) {
                result.splice(idx, 1);
            }
            date.setTime(date.getTime() - 1);

            document.cookie = `${name}=${value}; expires=${date.toGMTString()}`;
        }
    });
});
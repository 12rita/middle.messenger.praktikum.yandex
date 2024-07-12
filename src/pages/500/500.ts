import { error } from '../../components';

document.addEventListener('DOMContentLoaded', () => {
    const errorField = document.getElementById('error');

    const buttonId = 'buttonError500';

    if (errorField) {
        errorField.innerHTML = error({
            errorCode: 500,
            errorText: 'Мы уже фиксим',
            id: buttonId,
            label: 'Назад к чатам'
        });

        const button = document.getElementById(buttonId);

        if (button) {
            button.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = '../chats/Chats.html';
                link.click();
            });
        }
    }
});

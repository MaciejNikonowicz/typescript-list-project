import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement;
  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();
    const input = document.getElementById('newItem') as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if (!newEntryText) return;

    // calculate item ID
    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;

    // create new item
    const newItem = new ListItem(itemId.toString(), newEntryText);
    // Add new item to full list
    fullList.addItem(newItem);
    // Re-render list with new item included
    template.render(fullList);
    // Clear input value
    input.value = '';
  });

  const clearItems = document.getElementById('clearItems') as HTMLButtonElement;
  clearItems.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
}

document.addEventListener('DOMContentLoaded', initApp);
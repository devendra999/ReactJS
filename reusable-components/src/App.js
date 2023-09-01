import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import SelectElement from './components/SelectElement';
import Title from './components/Title';
import List from './components/List';
import Index from './components/toggle/Index';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const items = ['Item 1', 'Item 2', 'Item 3'];

function App() {
  return (
    <>
      <div className="title-element">
        <Title text="Hello World" />
        <Title text="Hello World" style={{ fontSize: '30px', color: '#0f0' }} />
        <Title text="Hello World" />
      </div>

      <hr />

      <div className="button-element">
        <Button style={{ background: 'green', color: '#fff' }} type="submit">Hello</Button>
        <Button onClick={() => { alert('world') }}>World</Button>
        <Button onClick={() => { alert('welcome') }}>Welcome</Button>
      </div>

      <hr />

      <div className="input-element">
        <Input type="text" name="FirstName" placeholder="Enter First Name" />
        <Input type="number" name="phonenumber" placeholder="Mobile" min="7" max="10" />
        <Input type="file" name="Profile" />
      </div>

      <hr />

      <div className="select-element">
        <SelectElement id='Helloselect' options={options} />
      </div>

      <hr />

      <div className="list-element">
        <List items={items} />
      </div>

      <hr />

      <div className="accordion-element">
        <Index />
      </div>

      <hr />



    </>
  );
}

export default App;

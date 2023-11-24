
// Function types
//--------------------------------------------
    // function calculate(num1: number, num2: number) {
    //     return num1 + num2;
    // }

        // 1. Functional array (generic)
        // function getTotal(numbers: Array<number>) {
        //     return numbers.reduce((acc, item) => {
        //         return acc + item;
        //     }, 0);
        // }
        
        // 2. Functional array 
        // function getTotal(numbers: number[]) {
        //     return numbers.reduce((acc, item) => {
        //         return acc + item;
        //     }, 0);
        // }

        // console.log(getTotal([3, 2, 1]));



// Optional types
//--------------------------------------------
    // type User = {
    //     name: string;
    //     age: number;
    //     address?: string; // this is optional
    // };


// Union types
//--------------------------------------------
    // type ID = number | string;



// Custom types
//--------------------------------------------
    // type ID = number;
    
    
    
    
// Functional retun types
//--------------------------------------------
    // function login(userData: User): User {
    //     return userData;
    // }



// Type alias
//--------------------------------------------
// Note : cannot create duplicate type
// Note: interface create duplicates
// Note: interface used for object

    // type User = { // name should be start as capitalize
    //     name: string;
    //     age: number;
    //     address?: string;
    // };

        // 1. used Type alias
        //  const user: User = {
        //      name: 'hello',
        //      age: 30
        // }
        
        // 2. used in Function
        // function login(userData: User) {
        //      return userData;
        // }    
        
        // 2. used in Function return
        // function login(userData: User): User {
        //      return userData;
        // }    


    
// Interfaces (same as type alias)
//--------------------------------------------
// Note : cannot create duplicate type
// Note: interface create duplicates
// Note: interface used for object

    // interface Transaction { // name should be start as capitalize
    //     payerAccountNumber: number;
    //     payeeAccountNumber: number;
    // }

    // interface BankAccount {
    //     accountNumber: number;
    //     accountHolder: string;
    //     balance: number;
    //     isActive: boolean;
    //     transactions: Transaction[];
    // }

    // const transaction1: Transaction = {
    //     payerAccountNumber: 123,
    //     payeeAccountNumber: 455,
    // };

    // const transaction2: Transaction = {
    //     payerAccountNumber: 123,
    //     payeeAccountNumber: 456,
    // };

    // const bankAccount: BankAccount = {
    //     accountNumber: 123,
    //     accountHolder: 'John Doe',
    //     balance: 4000,
    //     isActive: true,
    //     transactions: [transaction1, transaction2],
    // };




// Typescript Extends interfaces 
//--------------------------------------------
// Note : extend an interface that allows you to copy the properties and methods of one interface to another.

// Note : We can extend the Interfaces in TypeScript to include other interfaces. This helps us to create a new interface consisting of definitions from the other interfaces. Extending interfaces gives us more flexibility in how we define our interfaces and reuse the existing interfaces.
  
    // interface Book {
    //     name: string;
    //     price: number;
    // }

    // interface EBook extends Book { // here we can access Book types
    //     fileSize: number;
    //     format: string;
    // }

    // interface AudioBook extends EBook { // here we can access EBook types
    //     duration: number;
    // }

    // const book: AudioBook = {
    //     duration: 4,
    // };

    
// Merge
//--------------------------------------------
// Note : Merge more than one interfaces

    // interface Book {
    //     name: string;
    //     price: number;
    // }

    // interface Book {
    //     size: number;
    // }

    // const book: Book = {
    //     name: 'Atomic habits',
    //     price: 1200,
    //     size: 45,
    // };
    
    

// Narrowing with unions
//--------------------------------------------
    // 1. Example
    // type ID = number | string;
    // function printId(id: ID) {
    //     if (typeof id === 'string') {
    //         console.log(id.toUpperCase());
    //     } else {
    //         console.log(id);
    //     }
    // }
    // printId('1');

    // 2. Example // this function is autometic decide what is return types
    // function getFirstThree(x: string | number[]) {
    //     return x.slice(0, 3);
    // }
    // console.log(getFirstThree([1, 2, 3, 4, 5]));

    
    
// Generics
//--------------------------------------------
// Note : Generics allow creating 'type variables' which can be used to create classes, functions & type aliases that don't need to explicitly define the types that they use. Generics makes it easier to write reusable code.



    // 1. Example 
    // function logString(arg: string) {
    //     console.log(arg);
    //     return arg;
    // }

    // function logNumber(arg: number) {
    //     console.log(arg);
    //     return arg;
    // }

    // function logArray(arg: any[]) {
    //     console.log(arg);
    //     return arg;
    // }

    // function logAnything<T>(arg: T): T { // this is generics used, T as a placeholder
    //     console.log(arg);
    //     return arg;
    // }

    // logAnything(['hello']);

    
    // 2. Example
    // interface HasAge {
    //     age: number;
    // }

    // function getOldest<T extends HasAge>(people: T[]): T {
    //     return people.sort((a, b) => b.age - a.age)[0];
    // }

    // const people: HasAge[] = [{ age: 30 }, { age: 40 }, { age: 10 }];

    // interface Player {
    //     name: string;
    //     age: number;
    // }
    // const players: Player[] = [
    //     { name: 'John', age: 30 },
    //     { name: 'Jane', age: 35 },
    //     { name: 'Joe', age: 16 },
    // ];
    
    // // Assertion
    // // const person = getOldest(players) as Player;

    // const person = getOldest(people);
    // person.age;
    
    // 3. Example
    // interface IPost {
    //     title: string;
    //     id: number;
    //     description: string;
    // }

    // interface IUser {
    //     id: number;
    //     name: string;
    //     age: number;
    // }

    // const fetchPostData = async (path: string): Promise<IPost[]> => {
    //     const response = await fetch(`http://example.com${path}`);
    //     return response.json();
    // };

    // const fetchUsersData = async (path: string): Promise<IUser[]> => {
    //     const response = await fetch(`http://example.com${path}`);
    //     return response.json();
    // };

    // const fetchData = async <ResultType>(path: string): Promise<ResultType> => {
    //     const response = await fetch(`http://example.com${path}`);
    //     return response.json();
    // }

    // (async () => {
    //     // const posts = await fetchPostData('/posts');
    //     const posts = await fetchData<IPost[]>('/posts');
    //     posts[0].
    // })();
    
    
    

// Structural typing or duck typing
//--------------------------------------------
// Note : 2 object ka shape same he to iska matble typscript ke hisab se vo ek same type ka object hota he
// Note : This example shows how we can have two different interfaces with no declared relations between them and a method to receive one of them. As we can see, there is no problem if we call the method “stringifyAge” passing a variable declared with another type (the “ICar” interface in this case).
// Note : The only thing that matters is that the received param has the required properties (“age:number”). In our example it could lead us to a failure, maybe the “age” in one is in years and the other one in months or the age of the model.

    // interface ICreadential {
        //     username: string;
        //     password: string;
        //     isAdmin?: boolean;
        // }

        // function login(credentials: ICreadential): boolean {
        //     console.log(credentials);
        //     return true;
        // }

        // const user = {
        //     username: 'codersgyan',
        //     password: 'secret',
        //     isAdmin: true,
        // };

        // login(user);
    
        
        
        
        
        
// interface IAuth {
//     username: string;
//     password: string;
//     login(username: string, password: string): boolean;
// }

// const auth: IAuth = {
//     username: 'codersgyan',
//     password: 'secret',
//     login(username: string, password: string) {
//       return true;
//     }
// }

// inference
// let num = 'Coders';
class Calculator{
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement; 
        this.clear();
    }

    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    compute(){
        let answer; 
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        
        switch (this.operation){
            case '+':
                answer=prev+curr;
                break;
            case '-':
                answer=prev-curr;
                break;
            case '*':
                answer=prev*curr;
                break;
            case '/':
                answer=prev/curr;
                break;
            default: 
                return
        }

        this.currentOperand=answer;
        this.previousOperand='';
        this.operation=undefined;
    }

    addNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString()+number.toString();
    }

    chooseOperation(operation){
        this.operation = operation;
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.previousOperand=this.currentOperand;
        this.currentOperand = '';
    }

    updateDisplay(){
        this.currentOperandElement.innerText = this.currentOperand;
        if(this.operation!=null){
            this.previousOperandElement.innerText = this.previousOperand+' '+this.operation;
        }
        else 
            this.previousOperandElement.innerText = '';
    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');

const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

clearButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})





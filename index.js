//Bài 1

function minChangesToPalindrome(s) {
    function isPalindrome(str) {
        return str === str.split('').reverse().join('');
    }

    if (isPalindrome(s)) {
        return 0;
    }

    const length = s.length;
    let changes = 0;
    
    for (let i = 0; i < Math.floor(length / 2); i++) {
        if (s[i] !== s[length - 1 - i]) {
            changes++;
        }
    }

    return changes;
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Nhập xâu S: ', (s) => {
    const result = minChangesToPalindrome(s);
    console.log(`Số lượng ký tự nhỏ nhất cần thay đổi để xâu S trở thành đối xứng: ${result}`);
    rl.close();
});

//Bài 2

function countBounces(N, X, L) {
    let totalDistance = 0;
    let bounces = 0;

    for (let i = 0; i <= N; i++) {
        if (totalDistance === X) {
            // Bóng đã vượt qua tọa độ X
            return bounces;
        }

        if (totalDistance >= X) {
            // Bóng đã vượt qua hoặc trùng tọa độ X sau một nảy trước đó
            return bounces;
        }

        if (i < N) {
            totalDistance += L[i];
            bounces++;
        }
    }

    // Bóng chưa vượt qua tọa độ X
    return -1;
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Nhập N và X (cách nhau bằng dấu cách): ', (input1) => {
    const [N, X] = input1.split(' ').map(Number);

    rl.question('Nhập dãy số L (cách nhau bằng dấu cách): ', (input2) => {
        const L = input2.split(' ').map(Number);
        const result = countBounces(N, X, L);

        if (result === -1) {
            console.log('Bóng chưa vượt qua tọa độ X.');
        } else {
            console.log(`Số lần nảy của bóng trước khi vượt qua hoặc trùng tọa độ X: ${result}`);
        }

        rl.close();
    });
});

//Bài 3

function hasDuplicate(arr) {
    const seen = new Set();

    for (let num of arr) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }

    return false;
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Nhập mảng A (các số cách nhau bằng dấu cách): ', (input) => {
    const A = input.split(' ').map(Number);
    const result = hasDuplicate(A);

    if (result) {
        console.log('true');
    } else {
        console.log('false');
    }

    rl.close();
});


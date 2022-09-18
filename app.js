function reverseString(str){
    var charList = str.split("");
    var reversedStr = charList.reverse();
    var reversedchar = reversedStr.join("")
    return(reversedchar);
}
function checkPalindrome(str){
    var check = reverseString(str);
    if(str === check){
        return true;
    }
    else{
        return false;
    }
}
function dateToString(date){
    if(date.day < 10){
        date.day = '0' + date.day;
    }
    else{
        date.day = date.day.toString();
    }
    if(date.month < 10){
        date.month = '0' + date.month;
    }
    else{
        date.month = date.month.toString();
    }
    date.year = date.year.toString();
    return(date);
}
function dateInAllFmt(date){
    var dateStr = dateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(2);
    var mmddyy = dateStr.month + dateStr.day +  + dateStr.year.slice(2);
    var yymmdd = dateStr.year.slice(2) + dateStr.month + dateStr.day;
    var mddyyyy = dateStr.month.slice(1) + dateStr.day + dateStr.year;

    return {'ddmmyyyy': ddmmyyyy,
            'mmddyyyy': mmddyyyy,
            'yyyymmdd': yyyymmdd,
            'ddmmyy': ddmmyy,
            'mmddyy': mmddyy,
            'yymmdd': yymmdd,
            'mddyyyy': mddyyyy}
    // return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function palindromeCheckForDate(date){
    var allTheFormatOfDate = dateInAllFmt(date);
    newArr = [];
    for(var datefmt in allTheFormatOfDate){
        if(checkPalindrome(allTheFormatOfDate[datefmt])){
            newArr.push(true)
            // console.log(`${datefmt}: ${allTheFormatOfDate[datefmt]} is palindrome.`);
        }
        else{
            newArr.push(false);
        }
    }
    return newArr;
}
function checkForLeapYear(year){
    if (year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}
function getNextDate(date){
    date.day = date.day + 1;
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(date.month === 2){
        if(checkForLeapYear(date.year)){
            if(date.day > 29){
                date.day = 1;
                date.month++;
            }
        return date;
        }
        else{
            if(date.day > 28){
                date.day = 1;
                date.month++;
            }
            return date;
        }
    }
    else{
        if(date.day > daysInMonth[date.month-1]){
            date.day = 1;
            date.month++;
        }
        if(date.month > 12){
            date.month = 1;
            date.year++;
        }
        return date;
    }
}
function getNextPalindromeDate(date){
    var nextdate = getNextDate(date);
    cnt = 0;
    while(1){
        cnt++;
        var checkforPalindrome = palindromeCheckForDate(nextdate);
        for(var i = 0; i < checkforPalindrome.length; i++){
            if(checkforPalindrome[i]){
                return [cnt, nextdate];
            }
        }
        nextdate = getNextDate(nextdate);
    }
}
date = {
    day: 29,
    month: 02,
    year: 2020
};
console.log(getNextPalindromeDate(date))
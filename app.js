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
    var dateInStr = {day: '', month: '', year: ''};

    if(date.day < 10){
        dateInStr.day = '0' + date.day;
    }
    else{
        dateInStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateInStr.month = '0' + date.month;
    }
    else{
        dateInStr.month = date.month.toString();
    }
    dateInStr.year = date.year.toString();
    return(dateInStr);
}
function dateInAllFmt(dateStr){
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
    // return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd, mddyyyy];
}
function palindromeCheckForDate(date){
    var allTheFormatOfDate = dateInAllFmt(date);
    newArr = [];

    for(var i = 0; i < allTheFormatOfDate.length; i++){
        var result = checkPalindrome(allTheFormatOfDate[i]);
        newArr.push(result);
    }
    return newArr;
    
    // for(var datefmt in allTheFormatOfDate){
    //     if(checkPalindrome(allTheFormatOfDate[datefmt])){
    //         newArr.push(true)
    //         // console.log(`${datefmt}: ${allTheFormatOfDate[datefmt]} is palindrome.`);
    //     }
    //     else{
    //         newArr.push(false);
    //     }
    // }
    // return newArr;
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
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
        
    // date.day = date.day + 1;
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(month === 2){
        if(checkForLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
        if(month > 12){
            month = 1;
            year++;
        }
    }
    var newDate = {day: day, month: month, year: year};
    return(newDate);

}
function getNextPalindromeDate(date){
    var nextdate = getNextDate(date);
    var cnt = 0;
    while(1){
        cnt++;
        var dateStr = dateToString(nextdate);
        var checkforPalindrome = palindromeCheckForDate(dateStr);
        for(var i = 0; i < checkforPalindrome.length; i++){
            if(checkforPalindrome[i]){
                return [cnt, nextdate];
            }
        }
        nextdate = getNextDate(nextdate);
    }
}
date = {
    day: 03,
    month: 02,
    year: 2020
};
console.log(getNextPalindromeDate(date))
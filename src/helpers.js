"use strict";
exports.__esModule = true;
exports.commaFormat = exports.extractNewLinesFromString = exports.freqMap = exports.numDayDiff = exports.buildMessages = exports.extractHashtagsFromString = exports.extractEmojiFromString = exports.roundTimestampToStandardDateStr = exports.padLeft = void 0;
var _ = require("lodash");
function padLeft(input, paddingChar, minLength) {
    var base = input.toString();
    while (base.length < minLength) {
        base = paddingChar + base;
    }
    return base;
}
exports.padLeft = padLeft;
// day starts at 6am, otherwise round it back
// string in format YYYY-MM-DD
function roundTimestampToStandardDateStr(date) {
    // Subtract 6 hrs
    var translatedDate = new Date(date.getTime() - 6 * 60 * 60 * 1000);
    return translatedDate.getFullYear() + "-" + padLeft(translatedDate.getMonth() + 1, '0', 2) + "-" + padLeft(translatedDate.getDate(), '0', 2);
}
exports.roundTimestampToStandardDateStr = roundTimestampToStandardDateStr;
function extractEmojiFromString(c) {
    // @ts-ignore TODO use later compiler version
    var iterator = c.matchAll(/\p{Emoji}/ugi);
    var out = [];
    var nextVal = iterator.next();
    while (!nextVal.done) {
        var value = nextVal.value[0];
        if (!/\d/.test(value) && value !== '#') {
            out.push(value);
        }
        nextVal = iterator.next();
    }
    return out;
}
exports.extractEmojiFromString = extractEmojiFromString;
function extractHashtagsFromString(c) {
    // @ts-ignore TODO use later compiler version
    var iterator = c.matchAll(/#[A-Za-z\d]*/ugi);
    var out = [];
    var nextVal = iterator.next();
    while (!nextVal.done) {
        var value = nextVal.value[0];
        if (value.length > 2) {
            out.push(value);
        }
        nextVal = iterator.next();
    }
    return out;
}
exports.extractHashtagsFromString = extractHashtagsFromString;
function buildMessages(csv) {
    var messages = [];
    csv.forEach(function (row) {
        var rawDate = new Date(row[3]);
        messages.push({
            from: row[0] === "Me" ? 'matt' : 'cat',
            message: row[2],
            rawDate: rawDate,
            parsedDate: roundTimestampToStandardDateStr(rawDate)
        });
    });
    return messages;
}
exports.buildMessages = buildMessages;
var DAY_MS = 24 * 60 * 60 * 1000;
function numDayDiff(day1, day2) {
    return Math.round((day1.getTime() - day2.getTime()) / DAY_MS);
}
exports.numDayDiff = numDayDiff;
function freqMap(arr, transform) {
    if (transform === void 0) { transform = _.identity; }
    var out = {};
    arr.forEach(function (_el) {
        var key = transform(_el);
        if (!out[key]) {
            out[key] = 0;
        }
        out[key]++;
    });
    return out;
}
exports.freqMap = freqMap;
function extractNewLinesFromString(str) {
    return str.replace(/(\n)+/gi, '\n').trim().split('\n').filter(function (m) { return m; }).length;
}
exports.extractNewLinesFromString = extractNewLinesFromString;
function commaFormat(_num) {
    var _a = _num.toString().split('.'), num = _a[0], dec = _a[1];
    var output = '';
    output = num.slice(-3);
    num = num.slice(0, -3);
    while (num) {
        output = num.slice(-3) + ',' + output;
        num = num.slice(0, -3);
    }
    if (dec) {
        output += '.' + dec;
    }
    return output;
}
exports.commaFormat = commaFormat;

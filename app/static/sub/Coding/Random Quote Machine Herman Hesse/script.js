var quoteUrl = "https://en.wikiquote.org/w/api.php?action=query&titles=Hermann_Hesse&prop=revisions&rvprop=content&format=json";
function getKeys(jsonObject) {
  var jKeys = [];
  for (var key in jsonObject) {
    jKeys.push(key);
  }
  return jKeys;
}


function replaceAll (str1, str2, string)
{
    return string.replaceAll(str1, str2);
}

function onlyQuotes(string) {
  var indexEnd = string.indexOf("== Quotes about Hermann Hesse ==");
  var indexStart = string.indexOf("== Quotes ==") + "== Qutoes == ".length;
  if (indexEnd) {
    string = string.slice(0, indexEnd);
  }
  if (indexStart) {
    string = string.slice(indexStart);
  }
  string = string.trim();
  return string;
}

function getQuotes(string) {
  string = string.split("\n");
  for (var i = 0; i < string.length; i++) {
    if (string[i].indexOf("===") !== -1 || string[i].indexOf("**") !== -1) {
      for (var k = i; k < string.length; k++) {
        if (string[k][0] === "*") {
          break;
        }
        string[k] = "";
      }
      string[i] = "";
    }
  }
  string = string.join("\n");
  var quoteArr= string.split("*");
  for (var j = 0; j < quoteArr.length; j++) {
    quoteArr[j] = quoteArr[j].trim();
  }
  return quoteArr;
}

function addTo(string) {
  var needsBackslash = "{}[]()|.$^\\?*+";
  var newString = "";
  for (var i = 0; i < string.length; i++) {
    if (needsBackslash.includes(string[i])) {
      newString += "\\";
    }
    newString += string[i];
  }
  return newString;
}

function findClosure(start, end, string) {
  var count = 1;
  for (var i = 0; i < string.length; i++) {
    if (string.slice(i, i + start.length) === start) {
      count += 1;
    }
    else if (string.slice(i, i + end.length) === end) {
      count -= 1;
      if (count === 0) {
        return i + end.length;
      }
    }
  }
  return "aaaaaa";
}

function removeBrackets(string) {
  return string.replaceAll(`/[\[\]\]/g`, '');
}

function replaceFile(string) {
  while (string.indexOf("[[File:") !== -1) {
    var subIndex = string.indexOf("[[File:");
    var brackEnd = findClosure("[[", "]]", string.substring(subIndex + 2));
    string = string.replace(string.substring(subIndex, subIndex + brackEnd + 2), "");
    
  }
  return string;
}

function largerThan(array, num) {
  var nArr = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i].length > num) {
      nArr.push(array[i]);
    }
  }
  return nArr;
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function mainStringParser(string) {
  string = onlyQuotes(string);
  string = replaceFile(string);
  string = removeBrackets(string);
  string = replaceAll("\'", "", string);
  string = replaceAll("\"", "", string);
  var arr = getQuotes(string);
  arr = largerThan(arr, 15);
  return arr;
}

function jsonParser(wikiquoteJSON) {
  var pageKey = getKeys(wikiquoteJSON.query.pages)[0];
  console.log(wikiquoteJSON);
  console.log("\n ::  parse <sssss>  :: \n\n");
  var quoteString = wikiquoteJSON.query.pages[pageKey]["revisions"][0]["*"];
  var quoteArr = mainStringParser(quoteString);
  return quoteArr;
}

function getQuote() {
  $.ajax( {
    url: quoteUrl,
    dataType: "jsonp",
    type: "get",
    success: function(data) {
      console.log("succes----");
      var jsData = jsonParser(data);
      $("#quote" ).html(randomElement(jsData));
    }
  } );
}


$(document).ready(function () {
  getQuote();
  $( "#newQuote" ).click(function(){
    console.log("33");
    getQuote();
  });
  $("#tweetQuote").click(function() {
    var tweetWindow = window.open("https://twitter.com/intent/tweet?text=" +  $("#quote").html());
    if (!tweetWindow) {
      alert("This function reqruies you allowing poppups for this page.");
    }
  });
});

/*
  ------------------------------------------------------------
  ------------------------------------------------------------
*/

function make_unordered(line) {
    if (line.length >= 2 && (line[0] == "*" && line[1] == " ")) {
        return "<li>" + line.substring(2) + "</li>";
    }
    else {
        return line;
    }
     
}


function oincludes(orig_str, sub_str) {
    if (orig_str.split(sub_str).join("").length >= 1) {
        return false;
    }
    else {
        return true;
    }
}

function remove_children(element) {
    let nn = element.childNodes;
    for (let i = 0; i < nn.length; i++) {
        element.removeChild(nn[0]);
    }
    return element;
}


/*
  ------------------------------------------------------------
  ------------------------------------------------------------
*/

function make_links_images(ostr, is_image=false) {
    let spt = is_image ? ostr.split("![") : ostr.split("[");
    let rgt = new RegExp("\]\(.+\)");
    let new_string = spt[0];
        
    for (let i = 1; i < spt.length; i++) {
        let att = spt[i].indexOf("](");
        if (att !== -1) {
            let cc = spt[i].substr(att + 2).indexOf(")");
            if (cc !== -1) {
                if (is_image) {
                    new_string += "<img src='" + spt[i].substr(att + 2, cc) + "' class='MMM-img' alt='" + spt[i].substr(0, att) + "'></img>"; 
                }
                else {
                    new_string += "<a href='" + spt[i].substr(att + 2, cc) + "' class='MMM-link' >" + spt[i].substr(0, att) + "</a>";
                }
                new_string += spt[i].substr(att + 2 + cc + 1);
                continue;
            }
        }
        new_string += is_image ? "![" + spt[i] : "[" + spt[i];
    }
    return new_string;
}

function tag_adjust(ostr, ltr, tag_start, tag_end) {
    console.log(ostr);
    let ncc = ostr.split(ltr);
    let ncl = ncc.length; 
    for (let i = 1; (i + 1) < ncl; i += 2) {
        if (!ncc[i].includes(" ") && ncc[i].length >= 1) {
            ncc[i] = tag_start + ncc[i] + tag_end;
        }
        else {
            ncc[i] = ltr + ncc[i] + ltr;
        }
    }
    return ncl % 2 !== 0 ? ncc.join("") : ncc.slice(0, ncl - 1).join("") + ltr + ncc[ncl - 1];
}


function get_tag(line) {
    let AJ = line[0].length;
    if (line.length >= 1 && AJ >= 1 && AJ <= 6 &&
        line[0].every(function(el){ return el == "#"; })) {
        line.shift();
        console.log("HERE");
        return ["<H" + AJ.toString() + " class='MMM-el'>", "</H" + AJ.toString() + ">"];
    }
    else {
        return ["<p class='MMM-el'>", "</p>"];
    }
}

function handle_line(line) {
    line = make_links_images(line, true);
    line = make_links_images(line, false);
    console.log("HERE: " + line);
    line = make_unordered(line);
    line = tag_adjust(line, "**", "<b class='MMM-el'>", "</b>");
    line = tag_adjust(line, "*", "<i class='MMM-el'>", "</i>");
    
    line = line.split(" ").map( function(el) { 
                                    return el.split(""); 
                                });
   
    let SS = ""; let FF = "";
    TAG = get_tag(line);
    console.log(line);
    return TAG[0] + line.map(function(el){ return el.join("")}).join(" ") + TAG[1];
}

function to_markdown(tstr) {
    let let_split = tstr.split("\n");
    for (let i = 0; i < let_split.length; i++) {
        if (oincludes(let_split[i], " ")) {
            let_split[i] = "<p class='MMM-el'></p>";
        }
        if (oincludes(let_split[i], "-") && let_split[i].length >= 3) {
            let_split[i] = "<div class='MMM-horizontal-bar'></div>";
        }
        else {
            let_split[i] = handle_line(let_split[i]);
        }
        
    }
    return let_split;
}



console.log(to_markdown("##### H5\naksdfjsaf\n###hdf\n####### H6"));

let text_area = document.getElementById("MMM-text-input");
let text_result = document.getElementById("MMM-text-result");

text_area.addEventListener("input", function(){
    text_result.innerHTML = "";
    let tt_text = text_area.value;
    text_result.innerHTML = to_markdown(tt_text).join("");
});
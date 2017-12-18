'use strict';

module.exports = class Scraper {

    constructor() {
    }

    static exec(HTMLContent = "", FileContent = "", callback) {

        var datas = { values: [] };

        var html = HTMLContent.split("\n");
        var file = FileContent.split("\n");

        var indexHtml = 0;
        var indexFile = 0;

        var array_if = [];

        while (indexFile < file.length && indexHtml < html.length) {
            var lineFile = this.clean_line(file[indexFile]);
            var lineHtml = this.clean_line(html[indexHtml]);

            var no_html = false;

            if (lineFile == "{{*}}") {
                var next_active_range = this.getRangeActive(file, indexFile);
                var ret_range = this.getRangeMatch(html, indexHtml - 1, next_active_range);
                if (ret_range != -1) {
                    var end_range = ret_range[0];
                    ret_range[1].forEach(val => {
                        array_if.push(val);
                    })
                    indexHtml = end_range - 1;
                }
            }
            else if (lineFile.indexOf("{{") != -1 && lineFile.indexOf("}}") != -1) {
                var ret_arr = this.extractValueLine(lineFile, lineHtml, array_if);
                if (ret_arr != null) {
                    ret_arr.forEach(val => {
                        datas.values.push(val);
                    });
                }
            }

            if (lineFile.indexOf("[[") != -1 && lineFile.indexOf("]]") != -1) {
                var params = lineFile.slice(2, lineFile.length - 2).split("||");
                
                var check = 0;
                if (params[0] == "if")
                    check = 1;

                if (array_if.indexOf(params[check].slice(1, params[check].length - 1)) == -1)
                    no_html = true;
            }

            if (!no_html)
                indexHtml++;
            indexFile++;
        }

        console.log(array_if);
        console.log(datas);
        return;
    }

    static extractValueLine(template = "", val = "", array_if = []) {
        var array_val = [];

        var index = 0;
        var indexHtml = 0;

        var loop = 0;
        
        if (template.indexOf("[[") !== -1 && template.indexOf("]]") !== -1) {
            let params = template.slice(2, template.length - 2).split("||");
            if (array_if.indexOf(params[0].slice(1, params[0].length - 1)) === -1)
                return null;
            template = params[1];
        }

        while (template.slice(index).indexOf("{{") !== -1) {

            var new_line = template.slice(index);
            var new_val = val.slice(indexHtml);

            var pos = new_line.indexOf("{{");

            var start_search = new_line.slice(0, pos);
            if (index == pos)
                start_search = undefined;

            var pos_end = new_line.slice(new_line.indexOf("}}") + 2).indexOf("{{");

            var end_search;
            if (pos_end == -1)
                end_search = new_line.slice(new_line.indexOf("}}") + 2);
            else {
                var line_cut = new_line.slice(new_line.indexOf("}}") + 2);
                pos = line_cut.indexOf("{{");
                end_search = line_cut.slice(0, pos);
            }

            var name_val = new_line.slice(new_line.indexOf("{{") + 2, new_line.indexOf("}}"));
            var value = "";
            if (start_search == undefined)
                value = new_val.slice(0, new_val.indexOf(end_search));
            else
                value = new_val.slice(new_val.indexOf(start_search) + start_search.length, new_val.indexOf(end_search));

            array_val.push({ [name_val]: this.clean_line(value) });
            index += new_line.indexOf("}}") + 2;
        }
        return array_val;
    }

    static getRangeMatch(file, start = 0, match_part = []) {
        for (var index = start; index < file.length; index++) {
            var tmp_array_if = [];
            for (var index2 = 0; index2 < match_part.length; index2++) {
                var check_line = this.clean_line(match_part[index2]);
                if (check_line.indexOf("[[") !== -1 && check_line.indexOf("]]") !== -1) {
                    var tmp_line = check_line.slice(2, check_line.length - 2);
                    var params = tmp_line.split("||");
                    if (params[0] == "if" && params[2] == this.clean_line(file[index + index2]) && (!tmp_array_if || tmp_array_if.indexOf(params[1] === -1)))
                        tmp_array_if.push(params[1].slice(1, params[1].length - 1));
                }
                else {
                    if (check_line != this.clean_line(file[index + index2])) {
                        break;
                    }
                }
                if (index2 == match_part.length - 1)
                    return ([index, tmp_array_if]);
            }
        }
        return (- 1);
    }

    static getRangeActive(datas = [""], start = 0) {
        var index = start;
        while (index < datas.length && (datas[index].replace("\r", "").indexOf("{{*}}") !== -1))
            index++;
        var ret_match = [];
        for (index; index < datas.length; index++) {
            var line = this.clean_line(datas[index]);
            if (line.indexOf("{{") != -1 && line.indexOf("}}") != -1)
                break;
            ret_match.push(line);
        }
        return ret_match;
    }

    static clean_line(line) {
        if (!line) return line;
        return (line.replace("\t", "").replace("\r", "").trim());
    }
}
//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }
            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(data.in) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var checkioInput = data.in;
            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + ext.JSON.encode(userResult));

            if (!result) {
//                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + ext.JSON.encode(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
//                $content.find('.call').html('Pass: checkio(' + ext.JSON.encode(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new MWLAnimation();
            canvas.createExplanation($content.find(".explanation"), checkioInput, rightResult, true);


            this_e.setAnimationHeight($content.height() + 60);

        });


        var $tryit;
        var tCanvas;
        var inText;
        var $textInput;
        var $textResult;

        ext.set_console_process_ret(function (this_e, ret) {
            if (typeof(ret) === 'string') {
                ret = ret.replace(/\'/g, "");
            }
            var htmlText;
            if (typeof ret === "string" && ret.length === 1) {
                htmlText = tCanvas.processText(inText, ret);
            }
            else {
                htmlText = inText;
            }
            $textResult.html(htmlText);
            console.log(htmlText);
            $textResult.removeClass("invisible");
            $textInput.addClass("invisible");
            $tryit.find(".checkio-result").html("Result<br>" + JSON.stringify(ret));
        });

        ext.set_generate_animation_panel(function (this_e) {

            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit')));
            tCanvas = new MWLAnimation();
            $textInput = $tryit.find(".text-input");
            $textResult = $tryit.find(".text-result");

            $textResult.click(function() {
                $textResult.toggleClass("invisible");
                $textInput.toggleClass("invisible");
            });

            $tryit.find(".bn-check").click(function (e) {
                inText = $textInput.val();
                this_e.sendToConsoleCheckiO(inText);
                e.stopPropagation();
                return false;
            });
        });

        function MWLAnimation() {
            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var thisVar = this;

            var explDom;
            var htmlText;

            this.createExplanation = function(dom, text, mwl, prefix) {

                explDom = dom;
                var res = (prefix ? 'Input<br>' : "") + '"' + thisVar.processText(text, mwl) + '"';
                explDom.html(res);
            };

            this.processText = function(text, mwl) {
                mwl = mwl.toLowerCase();
                var upperMwl = mwl.toUpperCase();
                htmlText = "";

                for (var i = 0; i < text.length; i++) {
                    var letter = text[i];
                    if (letter === mwl || letter === upperMwl) {
                        htmlText += '<span class="mwl">' + letter + '</span>';
                    }
                    else {
                        htmlText += letter;
                    }
                }
                return htmlText;
            }
        }


        //Your Additional functions or objects inside scope
        //
        //
        //


    }
);

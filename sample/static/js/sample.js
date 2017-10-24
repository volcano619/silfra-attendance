$(document).ready(function() {

///////////////////////////////////
        /*App Variables*/
///////////////////////////////////
        
    var workHoursBtn = document.getElementById('workHoursBtn');
    var vactionBtn = document.getElementById('vactionBtn');
    var breakHoursBtn = document.getElementById('breakHoursBtn');
    var workHours = document.getElementsByClassName('workHours');
    var vaction = document.getElementsByClassName('vaction');
    var breakHours = document.getElementsByClassName('breakHours');
    var drawWorkTimeTableBody = document.getElementById('drawWorkTimeTableBody');
    var x = 0;
    var tableDayes = {
        0: '.sunday',
        1: '.monday',
        2: '.tuesday',
        3: '.wednesday',
        4: '.thursday',
        5: '.friday',
        6: '.saturday'
    };
    var dayes = {
        0: 'sunday',
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
        6: 'saturday'
    };
        
    function changeColor1() {
        x = 1;
    }
    function changeColor2() {
        x = 2;
    }
    function changeColor3() {
        x = 0;
    }
    workHoursBtn.onclick = changeColor3;
    vactionBtn.onclick = changeColor1;
    breakHoursBtn.onclick = changeColor2;
        
///////////////////////////////////
        /*Change Cell Color*/
///////////////////////////////////
        
    function changeCellColor() {
        if (x == 0) {
            $(this).toggleClass('workHours');
            $(this).removeClass('vaction breakHours');
        }
        if (x == 1) {
            $(this).toggleClass('vaction');
            $(this).removeClass('workHours breakHours');
        }
        if (x == 2) {
            $(this).toggleClass('breakHours');
            $(this).removeClass('workHours vaction');
        }
    };
        
        
        
$(function dragChangeCellColor() {
  var isMouseDown = false;
  $(".js-TimeShifts table tbody tr td")
    .mousedown(function () {
      isMouseDown = true;
              if (x == 0) {
            $(this).toggleClass('workHours');
            $(this).removeClass('vaction breakHours');
        }
        if (x == 1) {
            $(this).toggleClass('vaction');
            $(this).removeClass('workHours breakHours');
        }
        if (x == 2) {
            $(this).toggleClass('breakHours');
            $(this).removeClass('workHours vaction');
        }
      return false; // prevent text selection
    })
    .mouseover(function () {
      if (isMouseDown) {
                if (x == 0) {
            $(this).toggleClass('workHours');
            $(this).removeClass('vaction breakHours');
        }
        if (x == 1) {
            $(this).toggleClass('vaction');
            $(this).removeClass('workHours breakHours');
        }
        if (x == 2) {
            $(this).toggleClass('breakHours');
            $(this).removeClass('workHours vaction');
        }
      }
    });
  $(document)
    .mouseup(function () {
      isMouseDown = false;
    });
});

        
///////////////////////////////////
        /*Change Row Color*/
///////////////////////////////////
        
    function changeRowColor() {
        if (x == 0) {
            $(this).siblings().toggleClass('workHours');
            $(this).removeClass('workHours');
            $(this).siblings().removeClass('vaction breakHours');
        }
        if (x == 1) {
            $(this).siblings().toggleClass('vaction');
            $(this).removeClass('vaction');
            $(this).siblings().removeClass('workHours breakHours');
        }
        if (x == 2) {
            $(this).siblings().toggleClass('breakHours');
            $(this).removeClass('breakHours');
            $(this).siblings().removeClass('workHours vaction');
        }
    };
    $('.js-TimeShifts table tbody tr td:nth-of-type(1)').click(changeRowColor);
        
///////////////////////////////////////////
        /*Get Work Time Table Data*/
///////////////////////////////////////////
        
    function getWorkTimeTableData() {
        var array = [];
        for (i = 0; i < $('.js-TimeShifts table tbody').children('tr').length; i++) {
            var workHours = [];
            var vactionHours = [];
            var breakHours = [];
            var emptyHours = [];
            var vars = {};
            Array.prototype.max = function() {
                return Math.max.apply(Math, this);
            };
            Array.prototype.min = function() {
                return Math.min.apply(Math, this);
            };
            totalWorkHours = $(".row" + i).children('.workHours').length / 2;
            totalVactionHours = $(".row" + i).children('.vaction').length / 2;
            totalBreakHours = $(".row" + i).children('.breakHours').length / 2;
            totalEmptyHours = ($(".row" + i).children().not(".workHours, .vaction, .breakHours").length - 1) / 2;
            $(".row" + i + " .workHours").each(function() {
                var getWorkHours = $(this).index() / 2;
                workHours.push(getWorkHours);
            });
            var firstWorkHour = Math.min.apply(Math, workHours),
                lastWorkHour = Math.max.apply(Math, workHours);
            $(".row" + i + " .vaction").each(function() {
                var getVactionHours = $(this).index() / 2;
                vactionHours.push(getVactionHours);
            });
            var firstVactionHour = Math.min.apply(Math, vactionHours),
                lastVactionHour = Math.max.apply(Math, vactionHours);
            $(".row" + i + " .breakHours").each(function() {
                var getBreakHours = $(this).index() / 2;
                breakHours.push(getBreakHours);
            });
            $(".row" + i).children().not(".workHours, .vaction, .breakHours, td:nth-of-type(1)").each(function() {
                var getEmptyHours = $(this).index() / 2;
                emptyHours.push(getEmptyHours);
            });
            var firstBreakHour = Math.min.apply(Math, breakHours),
                lastBreakHour = Math.max.apply(Math, breakHours);
            var getDayName = $(".js-TimeShifts table tbody tr td:nth-of-type(1)");
            
            vars['finalReport' + dayes[i]] = {
                dayName: $(getDayName[i]).text(),
                workHours: workHours,
                vactionHours: vactionHours,
                breakHours: breakHours,
                totalWorkHours: totalWorkHours,
                totalVactionHours: totalVactionHours,
                totalBreakHours: totalBreakHours,
                firstWorkHour: firstWorkHour,
                lastWorkHour: lastWorkHour,
                firstVactionHour: firstVactionHour,
                lastVactionHour: lastVactionHour,
                firstBreakHour: firstBreakHour,
                lastBreakHour: lastBreakHour,
                totalEmptyHours: totalEmptyHours,
                emptyHours: emptyHours
            };
            array.push(vars['finalReport' + dayes[i]]);
        };

///////////////////////////////////////////
            /*Get JSon File*/
///////////////////////////////////////////

        console.log(array);
        var json = JSON.stringify(array);
        var blob = new Blob([json], {
            type: "application/json"
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.download = "backup.json";
        a.href = url;
        a.textContent = "Download backup.json";
        document.getElementById('content').appendChild(a);
    };
    $('#save').click(getWorkTimeTableData);
        
//////////////////////////////////////////////
        /*Draw Table Using Datepicker*/
//////////////////////////////////////////////
        
    $(function() {
        $("input[data-datepicker='True']").datepicker({
            format: "mm-yyyy",
            viewMode: 'years',
            changeMonth: true,
            changeYear: true,
            onSelect: function(date) {
                var getSelectedDate = document.getElementById('getDate');

                function getDaysInMonth(month, year) {
                    // Since no month has fewer than 28 days
                    var date = new Date(year, month, 1);
                    var days = [];
                    while (date.getMonth() === month) {
                        days.push(new Date(date));
                        date.setDate(date.getDate() + 1);
                    }
                    return days;
                };
                var selectedDate = getSelectedDate.value;
                var strMonth = parseInt(selectedDate.slice(0, 2)) - 1;
                var strYear = parseInt(selectedDate.slice(6, 10));
                var drawWorkTimeTableRows = [];
                for (i = 0; i < getDaysInMonth(strMonth, strYear).length; i++) {
                    drawWorkTimeTableRows.push('<tr class="row' + i + '"><td>' + dayes[getDaysInMonth(strMonth, strYear)[i].getDay()] + '</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
                };
                drawWorkTimeTableBody.innerHTML = drawWorkTimeTableRows.join("").toString();

                $(function dragChangeCellColor() {
                  var isMouseDown = false;
                  $(".js-TimeShifts table tbody tr td")
                    .mousedown(function () {
                      isMouseDown = true;
                              if (x == 0) {
                            $(this).toggleClass('workHours');
                            $(this).removeClass('vaction breakHours');
                        }
                        if (x == 1) {
                            $(this).toggleClass('vaction');
                            $(this).removeClass('workHours breakHours');
                        }
                        if (x == 2) {
                            $(this).toggleClass('breakHours');
                            $(this).removeClass('workHours vaction');
                        }
                      return false; // prevent text selection
                    })
                    .mouseover(function () {
                      if (isMouseDown) {
                                if (x == 0) {
                            $(this).toggleClass('workHours');
                            $(this).removeClass('vaction breakHours');
                        }
                        if (x == 1) {
                            $(this).toggleClass('vaction');
                            $(this).removeClass('workHours breakHours');
                        }
                        if (x == 2) {
                            $(this).toggleClass('breakHours');
                            $(this).removeClass('workHours vaction');
                        }
                      }
                    });
                  $(document)
                    .mouseup(function () {
                      isMouseDown = false;
                    });
                });
                $('.js-TimeShifts table tbody tr td:nth-of-type(1)').click(changeRowColor);
                $('#save').click(getWorkTimeTableData);
            },
        });
    });
});
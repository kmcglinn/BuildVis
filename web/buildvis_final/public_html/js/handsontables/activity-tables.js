// * Version: 0.1
// * 
// * Date: 18.02.2013
// *  
// * Author: Kris McGlinn
// * 
// * Last Modified: 18/08/13
// * 
// * Copyright: 	Knowledge and Data Engineering Group, 
// * 				Department of Computer Science,
// * 				Faculty of Engineering and Systems Science,
// * 				Trinity College
// * 				Dublin 2
// * 				Ireland  
// * 




$(function () {
   
   
   var col_widths_meetings = [120, 120, 120, 120];
   var lunch_col_widths = [120, 120, 120];
   
    function myAutocompleteRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.AutocompleteCell.renderer.apply(this, arguments);
//        td.style.fontStyle = 'bold';
        td.style.overflow = 'hidden';
//        td.style.width = '2000px';
        td.title = 'Type to show the list of options';
//        td.autocomplete.overflow = 'scroll';
//        cellProperties.overflow = 'scroll';
//        cellProperties.style.overflow = 'scroll';

    }
   
    function loadExamples() {

        ///var date = ""; //set to empty for now

        /**
         * Identification
         */

        var $containerID = $("#id_roomNo");
        $containerID.handsontable({
        
        startRows: 1,
        startCols: 1,
        colWidths: [100],
        manualColumnResize: true,
        contextMenu: ['undo', 'redo'],
        rowHeaders: [handsontable_user_id_text, /*handsontable_room_number_text, "Zone ID" /*"Month", "Year"*/],
//        autoComplete: [
//            {
//            match: function (row, col, data) {
//                    return (row == 1); //if it is second row
//              },
//                    type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
//                    options: {items: 24}, //`options` overrides `defaults` defined in bootstrap typeahead
//                    source: function () {
//                    return table_room_number_array
//              },
//              strict: false //only accept predefined values (from array above)
//            }
//                          ],
//          contextMenu: ['undo', 'redo'],
        });


        $containerID.handsontable("loadData", user_id_handsontable_data);
        var handsontableID = $containerID.data('handsontable');

     //Meetings - Load & Save

        var $containerMeetingMon = $("#dailyMeetingsMon");

        $containerMeetingMon.handsontable({
            
            startRows: 7,
            startCols: 4,
            colWidths: col_widths_meetings,
//            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [begin_text, end_text, location_text, summary_text],
            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return day_start_time_array
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return day_start_time_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return meeting_location
                  },
                  strict: false //only accept predefined values (from array above)
                },
//                {
//                match: function (row, col, data) {
//                        return (col == 3); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array_entry
//                  },
//                  strict: false //only accept predefined values (from array above)
//                },
//                {
//                match: function (row, col, data) {
//                        return (col == 4); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array
//                  },
//                  strict: false //only accept predefined values (from array above)
//                }
              ],
        contextMenu: ['undo', 'redo'],
    });


var $containerMeetingTue = $("#dailyMeetingsTue");

        $containerMeetingTue.handsontable({
            
            startRows: 7,
            startCols: 4,
            colWidths: col_widths_meetings,
//            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [begin_text, end_text, location_text, summary_text],

            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return day_start_time_array
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return day_start_time_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return meeting_location
                  },
                  strict: false //only accept predefined values (from array above)
                },
//                {
//                match: function (row, col, data) {
//                        return (col == 3); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array_entry
//                  },
//                  strict: false //only accept predefined values (from array above)
//                },
//                {
//                match: function (row, col, data) {
//                        return (col == 4); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array
//                  },
//                  strict: false //only accept predefined values (from array above)
//
//                }
              ],
        contextMenu: ['undo', 'redo'],
    });


var $containerMeetingWed = $("#dailyMeetingsWed");

        $containerMeetingWed.handsontable({
            
            startRows: 7,
            startCols: 4,
            colWidths: col_widths_meetings,
//            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [begin_text, end_text, location_text, summary_text],

            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return day_start_time_array
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return day_start_time_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return meeting_location
                  },
                  strict: false //only accept predefined values (from array above)
                },
//                {
//                match: function (row, col, data) {
//                        return (col == 3); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array_entry
//                  },
//                  strict: false //only accept predefined values (from array above)
//                },
//                {
//                match: function (row, col, data) {
//                        return (col == 4); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array
//                  },
//                  strict: false //only accept predefined values (from array above)
//
//                }
              ],
        contextMenu: ['undo', 'redo'],
    });
    
    
    var $containerMeetingThur = $("#dailyMeetingsThur");

        $containerMeetingThur.handsontable({
            
            startRows: 7,
            startCols: 4,
            colWidths: col_widths_meetings,
//            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [begin_text, end_text, location_text, summary_text],

            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return day_start_time_array
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return day_start_time_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return meeting_location
                  },
                  strict: false //only accept predefined values (from array above)
                },
//                {
//                match: function (row, col, data) {
//                        return (col == 3); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array_entry
//                  },
//                  strict: false //only accept predefined values (from array above)
//                },
//                {
//                match: function (row, col, data) {
//                        return (col == 4); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array
//                  },
//                  strict: false //only accept predefined values (from array above)
//
//                }
              ],
        contextMenu: ['undo', 'redo'],
    });
    
    var $containerMeetingFri = $("#dailyMeetingsFri");

        $containerMeetingFri.handsontable({
            
            startRows: 7,
            startCols: 4,
            colWidths: col_widths_meetings,
//            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [begin_text, end_text, location_text, summary_text],

            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return day_start_time_array
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return day_start_time_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return meeting_location
                  },
                  strict: false //only accept predefined values (from array above)
                },
//                {
//                match: function (row, col, data) {
//                        return (col == 3); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array_entry
//                  },
//                  strict: false //only accept predefined values (from array above)
//                },
//                {
//                match: function (row, col, data) {
//                        return (col == 4); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array
//                  },
//                  strict: false //only accept predefined values (from array above)
//
//                }
              ],
        contextMenu: ['undo', 'redo'],
    });
    
    var $containerMeetingSat = $("#dailyMeetingsSat");

        $containerMeetingSat.handsontable({
            
            startRows: 7,
            startCols: 4,
            colWidths: col_widths_meetings,
//            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [begin_text, end_text, location_text, summary_text],

            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return day_start_time_array
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return day_start_time_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return meeting_location
                  },
                  strict: false //only accept predefined values (from array above)
                },
//                {
//                match: function (row, col, data) {
//                        return (col == 3); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array_entry
//                  },
//                  strict: false //only accept predefined values (from array above)
//                },
//                {
//                match: function (row, col, data) {
//                        return (col == 4); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array
//                  },
//                  strict: false //only accept predefined values (from array above)
//
//                }
              ],
        contextMenu: ['undo', 'redo'],
    });
    
    var $containerMeetingSun = $("#dailyMeetingsSun");

        $containerMeetingSun.handsontable({
            
            startRows: 7,
            startCols: 4,
            colWidths: col_widths_meetings,
//            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [begin_text, end_text, location_text, summary_text],

            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return day_start_time_array
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return day_start_time_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return meeting_location
                  },
                  strict: false //only accept predefined values (from array above)
                },
//                {
//                match: function (row, col, data) {
//                        return (col == 3); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array_entry
//                  },
//                  strict: false //only accept predefined values (from array above)
//                },
//                {
//                match: function (row, col, data) {
//                        return (col == 4); //if it is first column
//                  },
//                        source: function () {
//                        return meeting_path_array
//                  },
//                  strict: false //only accept predefined values (from array above)
//
//                }
              ],
        contextMenu: ['undo', 'redo'],
    });
    
    var handsontableMeetingMon = $containerMeetingMon.data('handsontable');

    var handsontableMeetingTues = $containerMeetingTue.data('handsontable');
    //
    var handsontableMeetingWeds = $containerMeetingWed.data('handsontable');
    //
    var handsontableMeetingThurs = $containerMeetingThur.data('handsontable');
    //
    var handsontableMeetingFri = $containerMeetingFri.data('handsontable');
    //
    var handsontableMeetingSat = $containerMeetingSat.data('handsontable');
    //
    var handsontableMeetingSun = $containerMeetingSun.data('handsontable');

       //Daily Breaks - Load & Save

    var $containerM = $("#dailyBreaksMon");
        $containerM.handsontable({
            
            startRows: 7,
            colWidths: [80, 80, 80, 80, 80, 80],
             autoComplete: [
            {
            match: function (row, col, data) {
                    return (col == 0); //if it is first column
              },
                    source: function () {
                    return iActivities /*"Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*/
              },
              highlighter: function (item) {
                var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                  return '<strong>' + match + '</strong>';
                });
                return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
              },
              strict: false  //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 1); //if it is first column
              },
                    source: function () {
                    return ["1", "2", "3","4", "5", "6", "7", "enter amount"]
              },
              strict: false //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 2); //if it is first column
              },
                    source: function () {
                    return ["5", "10", "15", "20", "25", "30", "enter amount"]
              },
              strict: false //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 3); //if it is first column
              },
                    source: function () {
                    return breaks_location_array
                    //["P6", "P5", "P1", "R07", "R13","R15", "R25", "R26", "R31", "R36"]
              },
              strict: false //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 5); //if it is first column
              },
                    source: function () {
                    return breaks_path_entry_array
              },
              strict: false //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 4); //if it is first column
              },
                    source: function () {
                    return breaks_path_exit_array
              },
              strict: false //only accept predefined values (from array above)
            }
            ],   
            startCols: 6,
            colHeaders: ["Type", "Frequentie", duration_text, location_text, path_text, alt_route_text],
            autoComplete: [
            {
            match: function (row, col, data) {
                    return (col == 0); //if it is first column
              },
                    source: function () {
                    return iActivities /*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*/
              },
              highlighter: function (item) {
                var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                  return '<strong>' + match + '</strong>';
                });
                return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
              },
              strict: false  //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 1); //if it is first column
              },
                    source: function () {
                    return ["1", "2", "3","4", "5", "6", "7", "enter amount"]
              },
              strict: false //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 2); //if it is first column
              },
                    source: function () {
                    return ["5", "10", "15", "20", "25", "30", "enter amount"]
              },
              strict: false //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 3); //if it is first column
              },
                    source: function () {
                    return breaks_location_array
              },
              strict: false //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 5); //if it is first column
              },
                    source: function () {
                    return breaks_path_entry_array
              },
              strict: false //only accept predefined values (from array above)
            },
            {
            match: function (row, col, data) {
                    return (col == 4); //if it is first column
              },
                    source: function () {
                    return breaks_path_exit_array
              },
              strict: false //only accept predefined values (from array above)
            }
        ],
        contextMenu: ['undo', 'redo'],
    });

    var handsontableM = $containerM.data('handsontable');
     //Daily Breaks - Load & Save

    var $containerTue = $("#dailyBreaksTues");
        $containerTue.handsontable({
            
            startRows: 7,
            startCols: 6,
            colWidths: [80, 80, 80, 80, 80, 80],
            fixedRowsTop:7,
            fixedColumnsLeft:6,
            colHeaders: ["Type", "Frequentie", duration_text, location_text, path_text, alt_route_text],
                autoComplete: [
                    {
                    match: function (row, col, data) {
                            return (col == 0); //if it is first column
                      },
                            source: function () {
                            return iActivities // /*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*/]
                      },
                      highlighter: function (item) {
                        var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                        var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                          return '<strong>' + match + '</strong>';
                        });
                        return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                      },
                      strict: false  //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 1); //if it is first column
                      },
                            source: function () {
                            return ["1", "2", "3","4", "5", "6", "7", "enter amount"]
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 2); //if it is first column
                      },
                            source: function () {
                            return ["5", "10", "15", "20", "25", "30", "enter amount"]
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 3); //if it is first column
                      },
                            source: function () {
                            return breaks_location_array
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 5); //if it is first column
                      },
                            source: function () {
                            return breaks_path_entry_array
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 4); //if it is first column
                      },
                            source: function () {
                            return breaks_path_exit_array
                      },
                      strict: false //only accept predefined values (from array above)
                    }
                ],
            contextMenu: ['undo', 'redo'],
        });

      var handsontableTue = $containerTue.data('handsontable');

       //Daily Breaks - Load & Save

    var $containerWed = $("#dailyBreaksWed");
        $containerWed.handsontable({
            
            startRows: 7,
            colWidths: [80, 80, 80, 80, 80, 80],
            startCols: 6,
            colHeaders: ["Type", "Frequentie", duration_text, location_text, path_text, alt_route_text],
            autoComplete: [
                    {
                    match: function (row, col, data) {
                            return (col == 0); //if it is first column
                      },
                            source: function () {
                            return iActivities /*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*/ /*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*/
                      },
                      highlighter: function (item) {
                        var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                        var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                          return '<strong>' + match + '</strong>';
                        });
                        return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                      },
                      strict: false  //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 1); //if it is first column
                      },
                            source: function () {
                            return ["1", "2", "3","4", "5", "6", "7", "enter amount"]
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 2); //if it is first column
                      },
                            source: function () {
                            return ["5", "10", "15", "20", "25", "30", "enter amount"]
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 3); //if it is first column
                      },
                            source: function () {
                            return breaks_location_array
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 5); //if it is first column
                      },
                            source: function () {
                            return breaks_path_entry_array
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 4); //if it is first column
                      },
                            source: function () {
                            return breaks_path_exit_array
                      },
                      strict: false //only accept predefined values (from array above)
                    }
        ],
        contextMenu: ['undo', 'redo'],
    });

    var handsontableWed = $containerWed.data('handsontable');


     //Daily Breaks - Load & Save

    var $containerThurs = $("#dailyBreaksThurs");
        $containerThurs.handsontable({
            
            startRows: 7,
            colWidths: [80, 80, 80, 80, 80, 80],
            startCols: 6,
            colHeaders: ["Type", "Frequentie", duration_text, location_text, path_text, alt_route_text],
             autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        source: function () {
                        return iActivities /*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*//*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*/
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return ["1", "2", "3","4", "5", "6", "7", "enter amount"]
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return ["5", "10", "15", "20", "25", "30", "enter amount"]
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 3); //if it is first column
                  },
                        source: function () {
                        return breaks_location_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 5); //if it is first column
                  },
                        source: function () {
                        return breaks_path_entry_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 4); //if it is first column
                  },
                        source: function () {
                        return breaks_path_exit_array
                  },
                  strict: false //only accept predefined values (from array above)
                }
            ],
      contextMenu: ['undo', 'redo'],
    });

    var handsontableThurs = $containerThurs.data('handsontable');

        //Daily Breaks - Load & Save

    var $containerFri = $("#dailyBreaksFri");
        $containerFri.handsontable({
            
            startRows: 7,
            startCols: 6,
            colWidths: [80, 80, 80, 80, 80, 80],
            colHeaders: ["Type", "Frequentie", duration_text, location_text, path_text, alt_route_text],
            autoComplete: [
                    {
                    match: function (row, col, data) {
                            return (col == 0); //if it is first column
                      },
                            source: function () {
                            return iActivities /*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*/
                      },
                      highlighter: function (item) {
                        var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                        var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                          return '<strong>' + match + '</strong>';
                        });
                        return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                      },
                      strict: false  //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 1); //if it is first column
                      },
                            source: function () {
                            return ["1", "2", "3","4", "5", "6", "7", "enter amount"]
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 2); //if it is first column
                      },
                            source: function () {
                            return ["5", "10", "15", "20", "25", "30", "enter amount"]
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 3); //if it is first column
                      },
                            source: function () {
                            return breaks_location_array
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 5); //if it is first column
                      },
                            source: function () {
                            return breaks_path_entry_array
                      },
                      strict: false //only accept predefined values (from array above)
                    },
                    {
                    match: function (row, col, data) {
                            return (col == 4); //if it is first column
                      },
                            source: function () {
                            return breaks_path_exit_array
                      },
                      strict: false //only accept predefined values (from array above)
                    }
                ],
        contextMenu: ['undo', 'redo'],
    });

    var handsontableFri = $containerFri.data('handsontable');

        //Daily Breaks - Load & Save

    var $containerSat = $("#dailyBreaksSat");
        $containerSat.handsontable({
            
            startRows: 7,
            startCols: 6,
            colWidths: [80, 80, 80, 80, 80, 80],
            colHeaders: ["Type", "Frequentie", duration_text, location_text, path_text, alt_route_text],
            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        source: function () {
                        return iActivities /*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*//*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*/
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return ["1", "2", "3","4", "5", "6", "7", "enter amount"]
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return ["5", "10", "15", "20", "25", "30", "enter amount"]
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 3); //if it is first column
                  },
                        source: function () {
                        return breaks_location_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 5); //if it is first column
                  },
                        source: function () {
                        return breaks_path_entry_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 4); //if it is first column
                  },
                        source: function () {
                        return breaks_path_exit_array
                  },
                  strict: false //only accept predefined values (from array above)
                }
            ],
        contextMenu: ['undo', 'redo'],
    });

    var handsontableSat = $containerSat.data('handsontable');

        //Daily Breaks - Load & Save

    var $containerSun = $("#dailyBreaksSun");
        $containerSun.handsontable({
            
            startRows: 7,
            startCols: 6,
            colWidths: [80, 80, 80, 80, 80, 80],
            colHeaders: ["Type", "Frequentie", duration_text, location_text, path_text, alt_route_text],
            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        source: function () {
                        return iActivities /*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*//*,Toilet", "Excercise", "Walk to Printer", "Walk to mailbox", "Impromptu Meeting"*/
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 1); //if it is first column
                  },
                        source: function () {
                        return ["1", "2", "3","4", "5", "6", "7", "enter amount"]
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 2); //if it is first column
                  },
                        source: function () {
                        return ["5", "10", "15", "20", "25", "30", "enter amount"]
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 3); //if it is first column
                  },
                        source: function () {
                        return breaks_location_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 5); //if it is first column
                  },
                        source: function () {
                        return breaks_path_entry_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                match: function (row, col, data) {
                        return (col == 4); //if it is first column
                  },
                        source: function () {
                        return breaks_path_exit_array
                  },
                  strict: false //only accept predefined values (from array above)
                }
            ],
        contextMenu: ['undo', 'redo'],
    });

      var handsontableSun = $containerSun.data('handsontable');

              //Lunch Breaks - Load & Save

    var $container2 = $("#lunchBreak");
        $container2.handsontable({
            
            startRows: 7,
            startCols: 3,//5,
            colWidths: lunch_col_widths,
            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [begin_text, end_text, location_text, path_text, alt_route_text],
            colHeaders: [begin_text, end_text, location_text],
            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return lunch_times
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                  match: function (row, col, data) {
                    if (col == 2) {
                      return true;
                    }
                    return false;
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  source: function () {
                    return lunch_location

                  },
                  strict: false //allows other values that defined in array above
                },
                 {
                  match: function (row, col, data) {
                    if (col == 4) {
                      return true;
                    }
                    return false;
                  },
                  source: function () {
                    return lunch_path_array_entry
                  },
                  strict: false //allows other values that defined in array above
                },
                {
                match: function (row, col, data) {
                    if (col == 3) {
                      return true;
                    }
                    return false;
                  },
                  source: function () {
                    return lunch_path_array_exit
                  },
                  strict: false //allows other values that defined in array above
                },
                {
                match: function (row, col, data) {
                    if (col == 0) {
                      return true;
                    }
                    return false;
                  },
                  source: function () {
                    return lunch_times
                  },
                  strict: false //allows other values that defined in array above
                },
                {
                match: function (row, col, data) {
                    if (col == 1) {
                      return true;
                    }
                    return false;
                  },
                  source: function () {
                    return lunch_times_end
                  },
                  strict: false //allows other values that defined in array above
                }
            ],
        contextMenu: ['undo', 'redo'],

    });

    var handsontable2 = $container2.data('handsontable');

    //Office Interactions Lunch Breaks - Load & Save

    var $container3 = $("#officeInteractions");
        $container3.handsontable({
            
            startRows: 7,
            startCols: 5,          
            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [ "Lighting On (Approx hours)", 
          "Window Open (Approx Hours)", "Blinds Lowered  (Approx Hours)", "Door Open  (Approx Hours)", 
          "Desktop On (Approx Hours)", "Lamp On (Approx Hours)"],
            contextMenu: ['undo', 'redo'],
            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return day_start_time_array
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                {
                  match: function (row, col, data) {
                    return (col == 0); //if it is first column
                  },
                  source: function () {
                    return ["0", "1", "2", "3", "4", "5", "6", "enter number"]
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                  match: function (row, col, data) {
                    if (col == 1) {
                      return true;
                    }
                    return false;
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  source: function () {
                    return ["0", "1", "2", "3", "4", "5", "6", "enter number"]
                  },
                  strict: false //allows other values that defined in array above
                },
                 {
                  match: function (row, col, data) {
                    if (col == 2) {
                      return true;
                    }
                    return false;
                  },
                  source: function () {
                    return ["0", "1", "2", "3", "4", "5", "6", "enter number"]
                  },
                  strict: false //allows other values that defined in array above
                },
                {
                match: function (row, col, data) {
                    if (col == 3) {
                      return true;
                    }
                    return false;
                  },
                  source: function () {
                    return ["0", "1", "2", "3", "4", "5", "6", "enter number"]
                  },
                  strict: false //allows other values that defined in array above
                },
                {
                  match: function (row, col, data) {
                    return (col == 4); //if it is first column
                  },
                  source: function () {
                    return ["0", "1", "2", "3", "4", "5", "6", "enter number"]
                  },
                  strict: false //only accept predefined values (from array above)
                },
                 { match: function (row, col, data) {
                    return (col == 5); //if it is first column
                  },
                  source: function () {
                    return ["0", "1", "2", "3", "4", "5", "6", "enter number"]
                  },
                  strict: false //only accept predefined values (from array above)
                }
            ]
    });

    var handsontable3 = $container3.data('handsontable');


    //Day Start and Eindtijd and Route to and from Office - Load & Save
    console.log('Creating Day Start End Table');
    var $container4 = $("#dayStart_dayEnd");
    
        $container4.handsontable({
            
            startRows: 7,
            startCols: 3,
            rowHeaders: [monday_text, tuesday_text, wednesday_text, thursday_text, friday_text, saturday_text, sunday_text],
            colHeaders: [begin_text, end_text, location_text],
            colWidths: [120, 120, 120],
            manualColumnResize: true,
            autoComplete: [
                {
                match: function (row, col, data) {
                        return (col == 0); //if it is first column
                  },
                        type: {renderer: myAutocompleteRenderer, editor: Handsontable.AutocompleteEditor},  
                        options: {items: 12}, //`options` overrides `defaults` defined in bootstrap typeahead
                        source: function () {
                        return day_start_time_array
                  },
                  highlighter: function (item) {
                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                      return '<strong>' + match + '</strong>';
                    });
                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
                  },
                  strict: false  //only accept predefined values (from array above)
                },
                        
//                {
//                  match: function (row, col, data) {
//                    if (col === 2||col === 4) {
//                      return true;
//                    }
//                    return false;
//                  },
//                  highlighter: function (item) {
//                    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
//                    var label = item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
//                      return '<strong>' + match + '</strong>';
//                    });
//                    return '<span style="margin-right: 10px; background-color: ' + item + '">&nbsp;&nbsp;&nbsp;</span>' + label;
//                  },
//                  source: function () {
//                    return table_room_number_array
//                  },
//                  strict: false //allows other values that defined in array above
//                },
                 {
                  match: function (row, col, data) {
                    if (col === 2) {
                      return true;
                    }
                    return false;
                  },
                  source: function () {
                    return table_room_number_array
                  },
                  strict: false //allows other values that defined in array above
                },
                 {
                  match: function (row, col, data) {
                    if (col === 3) {
                      return true;
                    }
                    return false;
                  },
                  source: function () {
                    return day_start_location
                  },
                  strict: false //allows other values that defined in array above
                },
                {
                match: function (row, col, data) {
                    if (col === 5) {
                      return true;
                    }
                    return false;
                  },
                  source: function () {
                    return day_start_path_exit
                  },
                  strict: false //allows other values that defined in array above
                },
                {
                  match: function (row, col, data) {
                    return (col == 0); //if it is first column
                  },
                  source: function () {
                    return day_start_time_array
                  },
                  strict: false //only accept predefined values (from array above)
                },
                {
                  match: function (row, col, data) {
                    return (col == 1); //if it is first column
                  },
                  source: function () {
                    return day_end_time_array
                  },
                  strict: false //only accept predefined values (from array above)
                }
        ],
          contextMenu: ['undo', 'redo']
    });

    var handsontable4 = $container4.data('handsontable');


//    var $parent = $containerM.parent();

        $("button[name='load']").click(function () {
        //$parent.find('button[name=load]').click(function () {
            var d = new Date();
//            log_data = log_data + d.getTime()+ " - Activity Load Button Clicked\n";

            parse_ID_Json(handsontableID.getData());
            handsontable4.clear();
            handsontable2.clear();
            
            handsontableMeetingMon.clear();
            handsontableMeetingTues.clear();
            handsontableMeetingWeds.clear();
            handsontableMeetingThurs.clear();
            handsontableMeetingFri.clear();
            handsontableMeetingSat.clear();
            handsontableMeetingSun.clear();
            

            handsontable4.loadData(queryActivities(handsontableID.getData(), 'WorkPlace').data);
            
            handsontable2.loadData(queryActivities(handsontableID.getData(), 'Lunch').data);
 
            var tableBreaksDay = parseInt($("#dayOptionsId").val());

//            if(tableBreaksDay==='0')
//            {
//
//                handsontableM.loadData(queryBreaks($("#dayOptionsId").val()).data);
//
//            }
//            else if (tableBreaksDay=='1')
//            {
//                handsontableTue.loadData(queryBreaks($("#dayOptionsId").val()).data);          
//
//            }
//            else if (tableBreaksDay=='2')
//            {
//                handsontableWed.loadData(queryBreaks($("#dayOptionsId").val()).data);
//
//            }
//            else if (tableBreaksDay=='3')
//            {
//                handsontableThurs.loadData(queryBreaks($("#dayOptionsId").val()).data);
//
//            }
//            else if (tableBreaksDay=='4')
//            {
//                handsontableFri.loadData(queryBreaks($("#dayOptionsId").val()).data);
//            }
//            else if (tableBreaksDay=='5')
//            {
//                handsontableSat.loadData(queryBreaks($("#dayOptionsId").val()).data);
//
//            }
//            else if (tableBreaksDay=='6')
//            {
//                handsontableSun.loadData(queryBreaks($("#dayOptionsId").val()).data);
//
//            }
            
            var tableMeetingsDay = parseInt($("#dayMeetingOptionsId").val());
            
            if(tableMeetingsDay=='0')
            {

                handsontableMeetingMon.loadData(queryMeetings(0, 'Meeting').data);
                

            }
            else if (tableMeetingsDay=='1')
            {
       
                handsontableMeetingTues.loadData(queryMeetings(1, 'Meeting').data);

            }
            else if (tableMeetingsDay=='2')
            {

                handsontableMeetingWeds.loadData(queryMeetings(2, 'Meeting').data);

            }
            else if (tableMeetingsDay=='3')
            {

                handsontableMeetingThurs.loadData(queryMeetings(3, 'Meeting').data);

            }
            else if (tableMeetingsDay=='4')
            {

                handsontableMeetingFri.loadData(queryMeetings(4, 'Meeting').data);
            }
            else if (tableMeetingsDay=='5')
            {

                handsontableMeetingSat.loadData(queryMeetings(5, 'Meeting').data);

            }
            else if (tableMeetingsDay=='6')
            {

                handsontableMeetingSun.loadData(queryMeetings(6, 'Meeting').data);

            }




        });
        
        
        $("button[name='load_gCal']").click(function () {
        //$parent.find('button[name=load]').click(function () {

            process_meetings_array();
            handsontableMeetingMon.loadData(gcal_convert_meetings_to_json(0).data);
            handsontableMeetingTues.loadData(gcal_convert_meetings_to_json(1).data);
            handsontableMeetingWeds.loadData(gcal_convert_meetings_to_json(2).data);
            handsontableMeetingThurs.loadData(gcal_convert_meetings_to_json(3).data);
            handsontableMeetingFri.loadData(gcal_convert_meetings_to_json(4).data);
            handsontableMeetingSat.loadData(gcal_convert_meetings_to_json(5).data);
            handsontableMeetingSun.loadData(gcal_convert_meetings_to_json(6).data);



        });
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $("button[name='save']").click(function () {
            
            var d = new Date();
            parse_ID_Json(handsontableID.getData());

            console.log('Pressing Save Button');
//	    console.log('The current value of work zone is: ' + officeName);

//            if(officeName==="")
//            {
//                alert(no_office_alert_string);
//            }
//            else {

                parseActivityJson(handsontable4.getData(), 'WorkPlace'); 

                parseActivityJson(handsontable2.getData(), 'Lunch');    

            
                parseMeetingsJson(handsontableMeetingMon.getData(), 0, 'Meeting');
                parseMeetingsJson(handsontableMeetingTues.getData(), 1, 'Meeting');
                parseMeetingsJson(handsontableMeetingWeds.getData(), 2, 'Meeting');
                parseMeetingsJson(handsontableMeetingThurs.getData(), 3, 'Meeting');
                parseMeetingsJson(handsontableMeetingFri.getData(), 4, 'Meeting');
                parseMeetingsJson(handsontableMeetingSat.getData(), 5, 'Meeting');
                parseMeetingsJson(handsontableMeetingSun.getData(), 6, 'Meeting');

            alert(activity_save_message);
            activities_overwrite=false;
            
        });























        $("button[name='log_data']").click(function () {
            var d = new Date();
//            log_data = log_data + d.getTime()+ " - Log Data Button Clicked\n";
//            log_data = log_data + d.getTime()+ " - Log Ends Here\n -------------------- \n";
            
//            parseIDJson(handsontableID.getData());
            retrieve_log_data();
            
        });
        $("button[name='path_activity_add_button_div']").click(function () {
            
            handsontable4.clear();
            var pos3 = new Array();
            var pos4 = new Array();
            var pos5 = new Array();
            var pos6 = new Array();
            
            var tempJSONObj = handsontable4.getData();
//            alert(tempJSONObj);
//            parseIDJson(handsontableID.getData());
//            console.log("Before");    
//            if(current_path_node_array.length===0)
//            {
//                console.log("Before1"); 
                for(var i=0; i<7;i++)
                {
                    console.log("A"+activity_day[i]);
                    console.log("E"+entrance_set);
                    pos3.push(undefined);
                    pos4.push(undefined);
                    //console.log(pos3[i]);
                    if((activity_day[i]===true)&&(entrance_set===true))
                    {
                        pos3[i] = document.getElementById('path_entrance_id_form').value;//first_path_node.id;    
                        pos4[i] = document.getElementById('path_id_form').value;
                        console.log(pos3[i]);
                        console.log(pos4[i]);
                    }
                    else  
                    {
                        pos3[i] = tempJSONObj[i][2];
                        pos4[i] = tempJSONObj[i][3];
//                        console.log(pos3[i]);
                    }
                }
                    
//            } 
//            if(current_path_node_array.length===0)
//            {
//                console.log("Before1"); 
                for(var i=0; i<7;i++)
                {
//                    console.log(activity_day[i]);
                    pos5.push(undefined);
                    pos6.push(undefined);
                    //console.log(pos3[i]);
                    if((activity_day[i]===true)&&(exit_set===true))
                    {
                        pos5[i] = document.getElementById('path_entrance_id_form').value;//first_path_node.id;    
                        pos6[i] = document.getElementById('path_id_form').value;
                        console.log(pos5[i]);
                        console.log(pos6[i]);
                        
//                        console.log(pos3[i]);
                    }
                    else
                    {
                        pos5[i] = tempJSONObj[i][4];
                        pos6[i] = tempJSONObj[i][5];
//                        console.log(pos3[i]);
                    }
                }
                    
//            }
//            for(var j = 0 ; j++; j<7){
//                
//                if(tempJSONObj[j][0]==="null"){
//                    tempJSONObj[j][0]="test";
//                }
//                
//            }
                work_place_handsontable_data = [
                [""+tempJSONObj[0][0]+"", ""+tempJSONObj[0][1]+"", ""+pos3[0]+"", ""+pos4[0]+"", ""+pos5[0]+"", ""+pos6[0]+""],
                [""+tempJSONObj[1][0]+"", ""+tempJSONObj[1][1]+"", ""+pos3[1]+"", ""+pos4[1]+"", ""+pos5[1]+"", ""+pos6[1]+""],
                [""+tempJSONObj[2][0]+"", ""+tempJSONObj[2][1]+"", ""+pos3[2]+"", ""+pos4[2]+"", ""+pos5[2]+"", ""+pos6[2]+""],
                [""+tempJSONObj[3][0]+"", ""+tempJSONObj[3][1]+"", ""+pos3[3]+"", ""+pos4[3]+"", ""+pos5[3]+"", ""+pos6[3]+""],
                [""+tempJSONObj[4][0]+"", ""+tempJSONObj[4][1]+"", ""+pos3[4]+"", ""+pos4[4]+"", ""+pos5[4]+"", ""+pos6[4]+""],
                [""+tempJSONObj[5][0]+"", ""+tempJSONObj[5][1]+"", ""+pos3[5]+"", ""+pos4[5]+"", ""+pos5[5]+"", ""+pos6[5]+""],
                [""+tempJSONObj[6][0]+"", ""+tempJSONObj[6][1]+"", ""+pos3[6]+"", ""+pos4[6]+"", ""+pos5[6]+"", ""+pos6[6]+""]
            ];
            //alert(work_place_handsontable_data);
            handsontable4.loadData(work_place_handsontable_data);		

        });
      //End Breaks

    }

    loadExamples();
    if (!$.browser.msie || parseInt($.browser.version, 10) > 7) { //syntax coloring does not work well with IE7
      $('pre.html').each(function (i, e) {
        hljs.highlightBlock(e)
      });
    }

    var examplesList = $('.examplesList');
    $('.example').each(function () {
      var $this = $(this);
      $this.append(examplesList.clone());
      $this.find('a[href~=#' + $this.attr('id').replace('container', '') + ']').addClass('active');
    });
    examplesList.remove();

});

//function load_button() {
//
//    alert("Load_Working");
//    //alert($("#month").val());
//    parseIDJson(handsontableID.getData());
//    handsontable4.clear();
//    handsontable2.clear();
//
//    handsontableM.clear();
//    handsontableTue.clear();	
//    handsontableWed.clear();
//    handsontableThurs.clear();
//    handsontableFri.clear();
//    handsontableSat.clear();
//    handsontableSun.clear();
//
//    //handsontableMeetingMon.clear();
//
//    handsontable4.loadData(queryStartEnd(handsontableID.getData()).data);
//    handsontable2.loadData(queryLunch(handsontableID.getData()).data);
//
//    handsontableM.loadData(queryBreaks(handsontableID.getData(), 0).data);
//    handsontableTue.loadData(queryBreaks(handsontableID.getData(), 1).data);		
//    handsontableWed.loadData(queryBreaks(handsontableID.getData(), 2).data);
//    handsontableThurs.loadData(queryBreaks(handsontableID.getData(), 3).data);
//    handsontableFri.loadData(queryBreaks(handsontableID.getData(), 4).data);
//    handsontableSat.loadData(queryBreaks(handsontableID.getData(), 5).data);
//    handsontableSun.loadData(queryBreaks(handsontableID.getData(), 6).data);
//
//    //handsontableMeetingMon.loadData(queryMeetings(handsontableID.getData(), 0).data);
//
//  //parseDayScheduleJson(handsontable4.getData());
//
//}//             alert("After");
//            if(current_path_node_array.length===0)
//            {
//                if((activity_day===1)&&(entrance_set===true))                       
//                {
//                    pos13 = first_path_node.id;
//                }
//                else if((activity_day===1)&&(entrance_set===false))    
//                {
//                    pos12 = tempJSONObj[0][2];
//                    pos13 = tempJSONObj[0][3];
//                }
//                if((activity_day===2)&&(entrance_set===true))                       
//                {
//                    pos23 = first_path_node.id;
//                }
//                else if((activity_day===2)&&(entrance_set===false))    
//                {
//                    pos22 = tempJSONObj[1][2];
//                    pos23 = tempJSONObj[1][3];
//                }
//                if((activity_day===3)&&(entrance_set===true))                       
//                {
//                    pos33 = first_path_node.id;
//                }
//                else if((activity_day===3)&&(entrance_set===false))    
//                {
//                    pos32 = tempJSONObj[2][2];
//                    pos33 = tempJSONObj[2][3];
//                }
//                if((activity_day===4)&&(entrance_set===true))                       
//                {
//                    pos43 = first_path_node.id;
//                }
//                else if((activity_day===4)&&(entrance_set===false))    
//                {
//                    pos42 = tempJSONObj[3][2];
//                    pos43 = tempJSONObj[3][3];
//                }
//                if((activity_day===5)&&(entrance_set===true))                       
//                {
//                    pos53 = first_path_node.id;
//                }
//                else if((activity_day===5)&&(entrance_set===false))    
//                {
//                    pos52 = tempJSONObj[4][2];
//                    pos53 = tempJSONObj[4][3];
//                }
//                if((activity_day===6)&&(entrance_set===true))                       
//                {
//                    pos63 = first_path_node.id;
//                }
//                else if((activity_day===6)&&(entrance_set===false))    
//                {
//                    pos62 = tempJSONObj[5][2];
//                    pos63 = tempJSONObj[5][3];
//                }
//                if((activity_day===7)&&(entrance_set===true))                       
//                {
//                    pos73 = first_path_node.id;
//                }
//                else if((activity_day===7)&&(entrance_set===false))    
//                {
//                    pos72 = tempJSONObj[6][2];
//                    pos73 = tempJSONObj[6][3];
//                }
//            }
//            else 
//                if((activity_day===1)&&(entrance_set===true))                           
//                {
//                    pos13 = current_path_node_array[0].id;
//                    pos12 = current_activity_zone.id;
//                }
//                if((activity_day===2)&&(entrance_set===true))                            
//                {
//                    pos23 = current_path_node_array[0].id;
//                    pos22 = current_activity_zone.id;
//                }
//                if((activity_day===3)&&(entrance_set===true))                           
//                {
//                    pos33 = current_path_node_array[0].id;
//                    pos32 = current_activity_zone.id;
//                }
//                if((activity_day===4)&&(entrance_set===true))                            
//                {
//                    pos43 = current_path_node_array[0].id;
//                    pos42 = current_activity_zone.id;
//                }
//                if((activity_day===5)&&(entrance_set===true))                            
//                {
//                    pos53 = current_path_node_array[0].id;
//                    pos52 = current_activity_zone.id;
//                }
//                if((activity_day===6)&&(entrance_set===true))                           
//                {
//                    pos63 = current_path_node_array[0].id;
//                    pos62 = current_activity_zone.id;
//                }
//                if((activity_day===7)&&(entrance_set===true))                           
//                {
//                    pos73 = first_path_node.id;
//                    pos72 = current_activity_zone.id;
//                }                         
            
            
    

            
            
//            if(exit_set===false)
//            {
//                pos4 = tempJSONObj[0][4];
//                pos5 = tempJSONObj[0][5];
//            }
//            else 
//            {
//                pos4 = path_exit_id;
//                if(current_path_node_array.length===0){
//                    pos5 = first_path_node.id;
//                    
//                }
//                else pos5 = current_path_node_array[0].id;
//                
//            }
//            
//            if(activity_day===1){
//                
//            }
              
//            work_place_handsontable_data = [
//                [""+tempJSONObj[0][0]+"", ""+tempJSONObj[0][1]+"", ""+pos12+"", ""+pos13+"", ""+pos14+"", ""+pos15+""],
//                [""+tempJSONObj[1][0]+"", ""+tempJSONObj[1][1]+"", ""+pos22+"", ""+pos23+"", ""+pos24+"", ""+pos25+""],
//                [""+tempJSONObj[2][0]+"", ""+tempJSONObj[2][1]+"", ""+pos32+"", ""+pos33+"", ""+pos34+"", ""+pos35+""],
//                [""+tempJSONObj[3][0]+"", ""+tempJSONObj[3][1]+"", ""+pos42+"", ""+pos43+"", ""+pos44+"", ""+pos45+""],
//                [""+tempJSONObj[4][0]+"", ""+tempJSONObj[4][1]+"", ""+pos52+"", ""+pos53+"", ""+pos54+"", ""+pos55+""],
//                [""+tempJSONObj[5][0]+"", ""+tempJSONObj[5][1]+"", ""+pos62+"", ""+pos63+"", ""+pos64+"", ""+pos65+""],
//                [""+tempJSONObj[6][0]+"", ""+tempJSONObj[6][1]+"", ""+pos72+"", ""+pos73+"", ""+pos74+"", ""+pos75+""]
//            ];
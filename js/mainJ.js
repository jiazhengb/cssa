
function execute_query_filters() {
    event.preventDefault();
    let loading_bar = $("#loading_bar");

    // Show loading bar
    loading_bar.css('display', 'block');

    // Get course code
    let courseName = $("#searchCourse").val().toString().replace(/\s*/g, "");

    // Get filters
    let from_year_filter = 2007;

    let to_year_filter = 2020;

    let from_gpa_filter;

    let to_gpa_filter;

    let from_study_hours_filter;

    let to_study_hours_filter;

    let instructor_filter;

    let department_filter;

    let course_level_lower_filter = true;

    let course_level_upper_filter = true;

    let course_level_graduate_filter = true;

    let data = {
        "from_year_filter": from_year_filter,
        "to_year_filter": to_year_filter,
        "from_gpa_filter": from_gpa_filter,
        "to_gpa_filter": to_gpa_filter,
        "from_study_hours_filter": from_study_hours_filter,
        "to_study_hours_filter": to_study_hours_filter,
        "instructor_filter": instructor_filter,
        "department_filter": department_filter,
        "course_level_lower_filter": course_level_lower_filter,
        "course_level_upper_filter": course_level_upper_filter,
        "course_level_graduate_filter": course_level_graduate_filter
    };

    let token = "x=whGTdxSHX8M+c3";

    function gradeEval(val) {
        if (val == null)
            return 'N/A';
        if (val >= 4.0)
            return val + '(A)';
        if (val >= 3.7)
            return val + '(A-)';
        if (val >= 3.3)
            return val + '(B+)';
        if (val >= 3.0)
            return val + '(B)';
        if (val >= 2.7)
            return val + '(B-)';
        if (val >= 2.3)
            return val + '(C+)';
        if (val >= 2.0)
            return val + '(C)';
        if (val >= 1.7)
            return val + '(C-)';
        if (val >= 1.3)
            return val + '(D)';
        else
            return val + '(N/A)';
    }

    function getCourseName(name) {
        firstDigit = name.match(/\d/);
        indexed = name.indexOf(firstDigit);
        return name.substring(0., indexed) + '.' + name.substring(indexed);
    }

    sortTable = function (colunm) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("ctl00_ContentPlaceHolder1_gvCAPEs");
        switching = true;
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[colunm];
                y = rows[i + 1].getElementsByTagName("TD")[colunm];
                // Check if the two rows should switch place:
                if (parseFloat($(x).text()) > parseFloat($(y).text())) {
                    console.log($(x).text(),$(y).text());
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    $.ajax({
        headers: { "token": token },
        type: "POST",
        url: "https://cape.ucsdcssa.com:8443/namelesscape/course/" + getCourseName(courseName),
        // data: data,
    }).done(function (res) {
        var courseDate = '';
        res.forEach(function (item, index) {
            courseDate +=
                '<tr class="' + (index % 2 == 0 ? "even" : "odd") + '">' +
                '<td>' + item.instructor + '</td><td>' +
                '<a target="_blank">' + item.course + '</a>' +
                '</td><td>' + item.term + '</td><td align="right">' + item.enroll + '</td><td align="right">' +
                '<span ItemStyle-HorizontalAlign="Right">' + item.evalsMade + '</span>' +
                '</td><td align="right"' +
                '<span>' + item.rcmndClass + '%' + '</span>' +
                '</td><td align="right">' +
                '<span>' + item.rcmndInstr + '%' + '</span>' +
                '</td><td align="right">' +
                '<span">' + item.studyHrs + '</span>' +
                '</td><td align="right">' +
                '<span>' + gradeEval(item.avgGradeExpected) + '</span>' +
                '</td><td align="right">' +
                '<span>' + gradeEval(item.avgGradeReceived) + '</span>' +
                '</td>' +
                '</tr>'
        });
        loading_bar.css('display', 'none');
        // const filters_container = $("#filters");
        // if (filters_container.is(':visible')) {
        //     const filter_toggle = $("#filter-toggle");
        //     filters_container.toggle("slide");
        //     filter_toggle.toggleClass("fa-chevron-circle-down");
        //     filter_toggle.toggleClass("fa-chevron-circle-up");
        // }
        $("#search_results").css('top', '0%');
        $("#search_results").html(
            '<table cellspacing="0" border="0" id="ctl00_ContentPlaceHolder1_gvCAPEs" style="width:100%;border-collapse:collapse;">' +
            '<thead><tr><th scope="col">Instructor</th><th scope="col">Course</th><th scope="col">Term</th><th scope="col">Enroll</th><th scope="col">Evals Made</th><th scope="col">Rcmnd Class</th><th scope="col">Rcmnd Instr</th><th scope="col" onclick="sortTable(7)">Study Hrs/wk</th><th scope="col">Avg Grade Expected</th><th scope="col">Avg Grade Received</th></tr>' +
            '</thead>' +
            '<tbody>' +
            courseDate +
            '</tbody>'
        );
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // TODO: Something better than this
        loading_bar.css('display', 'none');
        if (courseName == '')
            alert("Enter something");
        else
            alert("Could not find results");
    });
}
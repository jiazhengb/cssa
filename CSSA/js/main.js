
    function execute_query_filters() {
        event.preventDefault();
        let loading_bar_container = $("#loading_bar");

        // Show loading bar
        loading_bar_container.css('display','block');

        // Grab filters
        let from_term_filter;

        let from_year_filter = 2007;

        let to_term_filter;

        let to_year_filter = 2020;

        let from_gpa_filter;

        let to_gpa_filter;

        let from_study_hours_filter;

        let to_study_hours_filter;

        let instructor_filter;

        let department_filter;

        let course_level_lower_filter = true;

        let course_level_upper_filter  = true;

        let course_level_graduate_filter = true;

        let data = {
                    "from_term_filter": from_term_filter,
                    "to_term_filter": to_term_filter,
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

        let token = 'vx9gq781VK8C4nCS1yaSgkbFmslpp9TkbWNBc5dPMDTAuxrnPSnEj3wz90naKoIo';

        $.ajax({
            // headers: { "X-CSRFToken": token },
            // type: "POST",
            url: "test/result.html",
            // data: data,
        }).done(function (res) {
            loading_bar_container.css('display','none');
            const filters_container = $("#filters");
            if (filters_container.is(':visible')) {
                const filter_toggle = $("#filter-toggle");
                filters_container.toggle("slide");
                filter_toggle.toggleClass("fa-chevron-circle-down");
                filter_toggle.toggleClass("fa-chevron-circle-up");
            }
            $("#search_results").html(res);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // TODO: Something better than this
            $("#loading_bar_container").css('display','none');
            alert("Could not load results");
        });
    }
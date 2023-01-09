addEventListener('load', (event) => {

    $('input[name="x_value"]').on('change', function() {
        $('input[name="' + this.name + '"]').not(this).prop('checked', false);
    });
});

addEventListener('load', (event) => {

    if (window.sessionStorage.getItem('table_data') != null) {
        console.log("sdfsdsfd");
        console.log(window.sessionStorage.getItem('table_data'));
        $('#result-table tr:last').after(window.sessionStorage.getItem('table_data'));
    }

});

jQuery.fn.mint_top_notification = function(params) {

    $(this).html('');
    
    var wrapper = $('<div>');

    $(this).append(wrapper);

    wrapper.width(params.width)
            .css('display', 'inline-table')
            .addClass('mint_top_notification_' + params.type)
            .append(
                $('<div>')
                .css('width', '12%')
                .css('height', params.height)
                .css('display', 'table-cell')
                .css('text-align', 'center')
                .css('vertical-align', 'middle')
                .append(
                    $('<span>')
                    .attr('title', 'Dismiss')
                    .addClass('mint_top_notification_icon_' + params.type)
                )
            )
            .append(
                $('<div>')
                .addClass('top_notification_content')
                .css('width', '70%')
                .css('height', params.height)
                .css('display', 'table-cell')
                .css('text-align', 'center')
                .css('vertical-align', 'middle')
                .html(params.content)
            )
            .append(
                $('<div>')
                .css('width', '8%')
                .css('height', params.height)
                .css('max-height', params.height)
                .css('display', 'table-cell')
                .css('text-align', 'center')
                .css('vertical-align', 'middle')
                .css('cursor', 'pointer')
                .append(
                    $('<span>')
                    .height(30)
                    .width(30)
                    .addClass('mint_top_notification_close')
                    .click(function() {
                            $(this).parent().parent().find('.top_notification_content').first().hide(50);
                            $(this).parent().parent().hide(150);
                    })
                )
            );

    if (params.autoHide) {
        wrapper.hide();
        wrapper.find('.top_notification_content').first().hide().delay(200).show(150);
        wrapper.show(300);
        wrapper.find('.top_notification_content').first().delay(3800).hide(250);
        wrapper.delay(4000).hide(200);
    }
    else {
        wrapper.hide();
        wrapper.find('.top_notification_content').first().hide().delay(200).show(150);
        wrapper.show(300);
    }
}

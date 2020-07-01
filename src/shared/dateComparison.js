import React from 'react';
import { DualRingSpinner, EllipsisSpinner } from 'components/DualRingSpinner';

Date.prototype.toShortFormat = function() {
    var month_names = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    var day = this.getDate();
    var month_index = this.getMonth();

    return `${day} - ${month_names[month_index]}`;
};
class DateComparison extends Component {
    state = {
        filteredEvents: [],
        currentEvent: {},
    };
    compareDates(data) {
        var tempData = [];
        var thisMonth = [];
        data.map(function(item) {
            if (new Date(item.eventDate).getMonth() > new Date().getMonth()) {
                item.eventDate = new Date(item.eventDate).toShortFormat();
                tempData.push(item);
            } else if (
                new Date(item.eventDate).getMonth() === new Date().getMonth()
            ) {
                item.eventDate = new Date(item.eventDate).toShortFormat();
                thisMonth.push(item);
            }
        });

        tempData.loading = false;
        this.setState({ filteredEvents: tempData, currentEvent: thisMonth });
    }
    componentDidMount() {
        this.compareDates(eventData);
    }
    scrollFreeRight() {
        document.querySelector('.free-scroll-container').scrollLeft += 280;
    }
    scrollFreeLeft() {
        document.querySelector('.free-scroll-container').scrollLeft += -280;
    }
    render() {
        const comparedEventData = this.state.filteredEvents;
        const currentEvent = this.state.currentEvent;
        return (
            <div className="container ">
                {!comparedEventData.loading ? (
                    <div>
                        {currentEvent.length > 0 ? (
                            <div className="events-carousel">
                                <Carousel autoplay={true}>
                                    {currentEvent.map((item, i) => (
                                        <div className="current-event" key={i}>
                                            <div className="current-event-banner">
                                                <img
                                                    alt={item.banner}
                                                    src={
                                                        item.banner ||
                                                        '/assets/images/confetti.jpg'
                                                    }
                                                />
                                            </div>
                                            <div className="current-event-data">
                                                <h3>
                                                    Event This Month
                                                    <span className="date-stamp">
                                                        {item.eventDate}
                                                    </span>
                                                </h3>
                                                <h2>{item.eventName}</h2>
                                                <p>{item.eventDesc}</p>
                                                {item.videoUrl ? (
                                                    // eslint-disable-next-line react/jsx-no-target-blank
                                                    <a
                                                        className="video-link"
                                                        target="_blank"
                                                        href={item.videoUrl}>
                                                        Watch Live
                                                    </a>
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        ) : null}

                        <h3 className="event-type-title noBorder">
                            Upcoming Events
                        </h3>
                        {comparedEventData.length > 0 ? (
                            <div className="free-scroll-container-wrapper">
                                <div className="free-scroll-container">
                                    {comparedEventData.map((item, i) => (
                                        <div
                                            className="event-card upcoming"
                                            key={i}>
                                            <span className="date-stamp">
                                                {item.eventDate}
                                            </span>
                                            <div className="folder-content">
                                                <h3>{item.eventName}</h3>
                                                <p>
                                                    {item.eventDesc.substring(
                                                        0,
                                                        50,
                                                    )}{' '}
                                                    {item.eventDesc.length >
                                                    50 ? (
                                                        <span>...</span>
                                                    ) : null}
                                                </p>
                                                <div className="button-group align-right bottom-collapse">
                                                    <Button
                                                        type="primary"
                                                        size="small"
                                                        // href={`/pictures/${item.eventName}`}
                                                    >
                                                        Know More
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {document.querySelector(
                                    '.free-scroll-container',
                                ) ? (
                                    comparedEventData.length * 280 - 20 >
                                    document.querySelector(
                                        '.free-scroll-container',
                                    ).clientWidth ? (
                                        <div>
                                            <span
                                                className="left-nav"
                                                onClick={this.scrollFreeLeft}>
                                                <Icon type="left" />
                                            </span>
                                            <span
                                                className="right-nav"
                                                onClick={this.scrollFreeRight}>
                                                <Icon type="right" />
                                            </span>
                                        </div>
                                    ) : null
                                ) : null}
                            </div>
                        ) : (
                            <p style={{ marginBottom: '60px' }}>
                                There are no upcoming events this year.
                            </p>
                        )}
                    </div>
                ) : (
                    <EllipsisSpinner />
                )}
            </div>
        );
    }
}
export default DateComparison;

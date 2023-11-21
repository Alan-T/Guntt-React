import React, { useState, useEffect, useRef } from "react";
import "./style.less";

const GunttChart = (props) => {
  const {
    rowHeight = 40, ///数据行高
    hourWidth = 80, ///数据行宽
    startTime = 7, ///默认起始时间     小屏幕会生效
    width = "100%",
    bodyHeight = "calc(100% - 40px)",
    rowTitle = "会议厅", //首列名称
    rows = [
      {
        ///行名
        title: "101会议厅",
        key: 101,
      },
      {
        title: "102会议厅",
        key: 102,
      },
      {
        title: "103会议厅",
        key: 103,
      },
      {
        title: "104会议厅",
        key: 104,
      },
      {
        title: "105会议厅",
        key: 105,
      },
      {
        title: "106会议厅",
        key: 106,
      },
      {
        title: "107会议厅",
        key: 107,
      },
      {
        title: "108会议厅",
        key: 108,
      },
      {
        title: "109会议厅",
        key: 109,
      },
      {
        title: "201会议厅",
        key: 201,
      },
      {
        title: "301会议厅",
        key: 301,
      },
    ],
    dataSource = [
      {
        ///行数据
        key: 101,
        tasks: [
          {
            key: 1,
            start: "07:00:00",
            end: "08:30:00",
            title: "面试",
          },
          {
            key: 2,
            start: "09:00:00",
            end: "11:30:00",
            title: "面试",
          },
        ],
      },
      {
        key: 104,
        tasks: [
          {
            key: 1,
            start: "02:00:00",
            end: "11:30:00",
            title: "月度会",
          },
          {
            key: 2,
            start: "12:20:00",
            end: "13:30:00",
            title: "周会",
          },
        ],
      },
      {
        key: 105,
        tasks: [
          {
            key: 1,
            start: "09:00:00",
            end: "10:30:00",
            title: "阅读会",
          },
          {
            key: 2,
            start: "11:20:00",
            end: "13:30:00",
            title: "茶话会",
          },
        ],
      },
    ],
  } = props;
  const valueScrollRef = useRef<HTMLDivElement>();
  const timeScrollRef = useRef<HTMLDivElement>();
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [tooltipVisble, setTooltipVisble] = useState("none");
  const [tooltipData, setTooltipData] = useState(null);
  const onScrollY = (e: any) => {
    valueScrollRef.current &&
      (valueScrollRef.current.scrollTop = e.target.scrollTop);
  };

  const onScrollX = (e: any) => {
    timeScrollRef.current &&
      (timeScrollRef.current.scrollLeft = e.target.scrollLeft);
  };

  const onWheel = (e: any) => {
    timeScrollRef.current && (timeScrollRef.current.scrollLeft += e.deltaY);
    valueScrollRef.current && (valueScrollRef.current.scrollLeft += e.deltaY);
  };

  const onMouseEnter = (_: any, value: any) => {
    setTooltipData(value);
    setTooltipVisble("block");
  };

  const onMouseMove = (e: any) => {
    e.nativeEvent.stopImmediatePropagation();
    const offset = ((e.clientX / document.body.clientWidth) * 100).toFixed(0);
    setTranslateX(Number(offset));
    setOffsetX(e.clientX);
    setOffsetY(e.clientY);
  };

  const onMouseLeave = () => {
    setTooltipVisble("none");
  };

  const timeInterval = (start: string, end: string) => {
    const t1 = new Date(`2017-1-1 ${start}`);
    const t2 = new Date(`2017-1-1 ${end}`);
    const interval = t2.getTime() - t1.getTime();
    if (interval < 0) return 0;
    return (interval / 1000 / 60 / 60).toFixed(2);
  };

  useEffect(() => {
    valueScrollRef.current &&
      (valueScrollRef.current.scrollLeft = hourWidth * startTime);
  }, []);

  return (
    <>
      <div className="container_wrapper" style={{ width }}>
        <div className="container" style={{ display: "block" }}>
          <div className="rowTitle" style={{ width: 150 }}>
            {rowTitle || null}
          </div>
          <div
            className="header_container"
            ref={timeScrollRef}
            style={{ marginLeft: 150 }}
          >
            <div className="time_header_container">
              <div className="time_header_item" style={{ width: hourWidth }}>
                00:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                01:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                02:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                03:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                04:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                05:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                06:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                07:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                08:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                09:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                10:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                11:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                12:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                13:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                14:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                15:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                16:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                17:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                18:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                19:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                20:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                21:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                22:00
              </div>
              <div className="time_header_item" style={{ width: hourWidth }}>
                23:00
              </div>
            </div>
          </div>
          <div
            className="desc_container"
            onScroll={onScrollY}
            style={{ height: bodyHeight, width: 150, display: "block" }}
          >
            {rows.map((row: any) => (
              <div
                key={row.key}
                className="row_desc_container"
                style={{ height: rowHeight, lineHeight: `${rowHeight}px` }}
              >
                {row.title}
              </div>
            ))}
          </div>
          <div
            className="val_container"
            ref={valueScrollRef}
            onScroll={onScrollX}
            onWheel={onWheel}
            style={{ height: bodyHeight, display: "block" }}
          >
            {rows.map((row: any) => (
              <div
                key={row.key}
                className="row_val_container"
                style={{
                  height: rowHeight,
                  lineHeight: `${rowHeight}px`,
                  width: 24 * hourWidth,
                }}
              >
                {dataSource.find((data: any) => data.key === row.key) ? (
                  dataSource
                    .find((data: any) => data.key === row.key)
                    .tasks.map((task: any) => (
                      <div
                        key={task.key}
                        onMouseEnter={(e) => onMouseEnter(e, task)}
                        onMouseLeave={onMouseLeave}
                        onMouseMove={onMouseMove}
                        className="activity"
                        style={{
                          width:
                            Number(timeInterval(task.start, task.end)) *
                            hourWidth,
                          left:
                            Number(timeInterval("00:00:00", task.start)) *
                            hourWidth,
                          backgroundColor: "#5e63b5",
                          height: 24,
                        }}
                      />
                    ))
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="tooltip"
        style={{
          left: offsetX,
          top: offsetY - 60,
          position: "fixed",
          display: tooltipVisble,
          transform: `translateX(-${translateX}%)`,
        }}
      >
        <div className="title">{tooltipData ? tooltipData.title : ""}</div>
        <div className="time">
          {`${tooltipData ? tooltipData.start : ""} - ${
            tooltipData ? tooltipData.end : ""
          }`}
        </div>
      </div>
    </>
  );
};

export default GunttChart;

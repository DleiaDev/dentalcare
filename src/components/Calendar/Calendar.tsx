"use client";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useCallback, useMemo, useState } from "react";
import {
  Calendar as BigCalendar,
  Components,
  dayjsLocalizer,
  EventProps,
  NavigateAction,
  ResourceHeaderProps,
  SlotInfo,
  ToolbarProps,
  View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ProfileCard from "@/components/ProfileCard";
import clsx from "clsx";
import "./Calendar.scss";
import { CalendarX2, Plus } from "lucide-react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { cn, getAmPmTime, getWeekOfMonth } from "@/lib/utils";
import DollarSign from "@/icons/dollar-sign.svg";
import Count from "@/components/Count";
import Button from "@/components/Button";
import Separator from "../ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import MultiSelect1 from "../MultiSelect1";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

dayjs.extend(isToday);
const localizer = dayjsLocalizer(dayjs);

type Patient = {
  name: string;
};

type Treatment = {
  name: string;
};

type Appointment = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
  style: "Finished, not paid" | "Finished, paid" | "Upcoming";
  status: "Finished" | "Encounter" | "Registered";
  treatment: Treatment;
  patient: Patient;
};

type Doctor = {
  id: number;
  imageUrl?: string;
  name: string;
  numberOfPatients: number;
};

const doctors: Doctor[] = [
  {
    id: 54351,
    imageUrl: "/doctor_1_400x400.avif",
    name: "Marko Ilic",
    numberOfPatients: 4,
  },
  {
    id: 54352,
    imageUrl: "/doctor_2_400x400.jpg",
    name: "Dr. Soap Mactavish",
    numberOfPatients: 2,
  },
  {
    id: 54353,
    imageUrl: "/doctor_3_400x400.jpg",
    name: "Dr. Jerald O'Hara",
    numberOfPatients: 3,
  },
  {
    id: 54354,
    imageUrl: "/doctor_4_400x400.webp",
    name: "Dr. Putri Larasati",
    numberOfPatients: 1,
  },
  {
    id: 54355,
    imageUrl: undefined,
    name: "Sabrina Leannon",
    numberOfPatients: 0,
  },
  {
    id: 54356,
    imageUrl: undefined,
    name: "John Doe",
    numberOfPatients: 0,
  },
];

const events: Appointment[] = [
  {
    id: 0,
    title: "asd",
    start: dayjs().day(5).hour(9).minute(0).second(0).toDate(),
    end: dayjs().day(5).hour(10).minute(0).second(0).toDate(),
    resourceId: 54351,
    style: "Finished, not paid",
    status: "Finished",
    treatment: {
      name: "General Checkup",
    },
    patient: {
      name: "Rafli Jainudin",
    },
  },
  {
    id: 1,
    title: "asd",
    start: dayjs().day(5).hour(10).minute(0).second(0).toDate(),
    end: dayjs().day(5).hour(11).minute(0).second(0).toDate(),
    resourceId: 54351,
    style: "Finished, paid",
    status: "Finished",
    treatment: {
      name: "Scaling",
    },
    patient: {
      name: "Sekar Nandita",
    },
  },
  {
    id: 2,
    title: "asd",
    start: dayjs().day(5).hour(12).minute(0).second(0).toDate(),
    end: dayjs().day(5).hour(13).minute(0).second(0).toDate(),
    resourceId: 54351,
    style: "Upcoming",
    status: "Encounter",
    treatment: {
      name: "Extraction",
    },
    patient: {
      name: "Lembaying Senja",
    },
  },
  {
    id: 3,
    title: "asd",
    start: dayjs().day(5).hour(14).minute(30).second(0).toDate(),
    end: dayjs().day(5).hour(15).minute(30).second(0).toDate(),
    resourceId: 54351,
    style: "Upcoming",
    status: "Registered",
    treatment: {
      name: "General Checkup",
    },
    patient: {
      name: "Daniswara",
    },
  },
];

function TimeSlotWrapper({
  resource,
  value,
}: {
  value: Date;
  resource?: Doctor["id"];
}) {
  const { isInGutter, endsIn00, hour, ampm } = useMemo(
    () => ({
      isInGutter: !resource,
      hour: (value.getHours() + 24) % 12 || 12,
      ampm: value.getHours() >= 12 ? "pm" : "am",
      endsIn00: value.getMinutes() === 0,
    }),
    [resource, value],
  );

  const slotClassName = clsx({
    "rbc-time-slot": true,
    "rbc-time-slot--gutter": isInGutter,
  });

  const shouldDisplayLabel = isInGutter && endsIn00;

  return (
    <div className={slotClassName}>
      {shouldDisplayLabel && (
        <span className="rbc-label">
          {hour}
          {ampm}
        </span>
      )}
    </div>
  );
}

function ResourceHeader({ resource: doctor }: ResourceHeaderProps<Doctor>) {
  return (
    <ProfileCard
      avatarProps={{
        className: "w-14 h-14",
        imageProps: {
          width: 56,
          height: 56,
          src: doctor.imageUrl,
          alt: doctor.name,
        },
      }}
      textSlot={
        <div className="flex flex-col items-start flex-1">
          <div className="font-bold text-lg">{doctor.name}</div>
          <div className="flex flex-wrap font-medium text-sm text-gray-600">
            {"Today's appointments:"}
            <span className="text-gray-900 ms-1">
              {doctor.numberOfPatients} patient(s)
            </span>
          </div>
        </div>
      }
      after={
        <DropdownMenu>
          <DropdownMenuTrigger className="text-gray-600 self-start hover:text-gray-900 data-[state=open]:text-gray-900">
            <DotsHorizontalIcon className="w-6 h-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <Plus className="me-4" />
              Add appointment
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CalendarX2 className="me-4" />
              Set unavailability
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    />
  );
}

const appointmentColors = {
  style: {
    "Finished, not paid": {
      background: "bg-appointment-finished-not-paid-bg",
      icon: "bg-appointment-finished-not-paid-icon-bg",
      treatmentTypeBorder:
        "border-appointment-finished-not-paid-treatment-type-border",
    },
    "Finished, paid": {
      background: "bg-appointment-finished-bg",
      icon: "bg-appointment-finished-icon-bg",
      treatmentTypeBorder: "border-appointment-finished-treatment-type-border",
    },
    Upcoming: {
      background: "bg-appointment-upcoming-bg",
      icon: "bg-appointment-upcoming-icon-bg",
      treatmentTypeBorder: "border-appointment-upcoming-treatment-type-border",
    },
  },
  status: {
    Finished: {
      dot: "bg-appointment-status-finished-bg",
    },
    Encounter: {
      dot: "bg-appointment-status-encounter-bg",
    },
    Registered: {
      dot: "bg-appointment-status-registered-bg",
    },
  },
};

const appointmentIcons = {
  "Finished, not paid": DollarSign,
  "Finished, paid": DollarSign,
  Upcoming: DollarSign,
};

function AppointmentComponent({ event: appointment }: EventProps<Appointment>) {
  const backgroundClassName =
    appointmentColors.style[appointment.style].background;
  const treatmentTypeBorderClass =
    appointmentColors.style[appointment.style].treatmentTypeBorder;
  const iconBackgroundClassName =
    appointmentColors.style[appointment.style].icon;
  const statusDotClassName = appointmentColors.status[appointment.status].dot;
  const Icon = appointmentIcons[appointment.style];
  const startTime = getAmPmTime(appointment.start);
  const endTime = getAmPmTime(appointment.end);
  return (
    <div className="h-full @container">
      <div
        className={cn(
          "p-2 h-full rounded-lg flex flex-col gap-1 @xs:grid @xs:items-center gap-x-3 grid-cols-[min-content_repeat(2,1fr)] grid-rows-[min-content_repeat(2,1fr)] @xs:p-3",
          backgroundClassName,
        )}
      >
        <Icon
          className={cn(
            "rounded-lg p-1 hidden w-[1.625rem] h-[1.625rem] @xs:block",
            iconBackgroundClassName,
          )}
          color="white"
        />
        <span className="text-gray-900 font-medium">
          {appointment.patient.name}
        </span>
        <div className="bg-white py-0.5 px-3 rounded-md hidden @xs:flex gap-2 items-center self-start justify-self-end">
          <span
            className={cn("rounded-full w-2 h-2", statusDotClassName)}
          ></span>
          <span className="text-gray-900 font-semibold text-sm">
            {appointment.status}
          </span>
        </div>
        <div></div>
        <span className="text-gray-700 font-medium text-sm self-start whitespace-nowrap">
          {`${startTime} -> ${endTime}`}
        </span>
        <div></div>
        <div></div>
        <span
          className={cn(
            "rounded-full text-gray-900 text-xs font-medium bg-white py-0.5 px-3 border self-start justify-self-start whitespace-nowrap @xs:text-sm",
            treatmentTypeBorderClass,
          )}
        >
          {appointment.treatment.name}
        </span>
        <div></div>
      </div>
    </div>
  );
}

function TimeGutterHeader() {
  return (
    <div className="flex justify-center items-center flex-col h-full">
      <div className="font-semibold">EST</div>
      <div className="text-sm">UTC - 5</div>
    </div>
  );
}

function Toolbar({ view, date, onNavigate, ...props }: ToolbarProps) {
  const onView = (view: string) => {
    if (view !== "day" && view !== "work_week") return;
    props.onView(view);
  };

  const isDateToday = dayjs(date).isToday();
  const isDayView = view === "day";
  const isTodayDisabled = isDateToday && isDayView;

  let dateText: string = "";
  if (view === "work_week") {
    const weekNumber = getWeekOfMonth(date);
    const monthName = dayjs(date).format(`MMMM YYYY`);
    dateText = `${monthName}, week ${weekNumber}`;
  } else if (view === "day") {
    dateText = dayjs(date).format("ddd, DD MMM YYYY");
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-2 grid-rows-2 gap-y-7 p-7 @7xl:flex @7xl:justify-between">
        <Count count={23} text="total appointment(s)" icon="calendar-check-2" />
        <div className="col-start-1 col-end-3 row-start-1 justify-center flex items-center">
          <Button
            className="me-3"
            disabled={isTodayDisabled}
            variant="secondary"
            onClick={() => onNavigate("TODAY")}
          >
            Today
          </Button>
          <div className="flex">
            <Button variant="ghost" onClick={() => onNavigate("PREV")}>
              <ChevronLeftIcon className="w-7 h-7 cursor-pointer" />
            </Button>
            <Button variant="ghost" onClick={() => onNavigate("NEXT")}>
              <ChevronRightIcon className="w-7 h-7 cursor-pointer" />
            </Button>
          </div>
          <div className="text-gray-900 font-semibold text-2xl w-[19ch] text-center">
            {dateText}
          </div>
          <Separator className="me-6" orientation="vertical" />
          <Tabs value={view} onValueChange={onView}>
            <TabsList>
              <TabsTrigger value="day" className="font-bold">
                Day
              </TabsTrigger>
              <TabsTrigger value="work_week">Week</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <MultiSelect1
          triggerClassName="justify-self-end"
          allVerbiage="All Dentists"
          items={doctors.map((doctor) => ({
            label: doctor.name,
            value: doctor.id,
          }))}
        />
      </div>
    </div>
  );
}

const components: Components<Appointment, Doctor> = {
  // @ts-expect-error
  timeSlotWrapper: TimeSlotWrapper,
  resourceHeader: ResourceHeader,
  event: AppointmentComponent,
  timeGutterHeader: TimeGutterHeader,
  // @ts-expect-error
  toolbar: Toolbar,
};

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("work_week");

  const onNavigate = useCallback(
    (newDate: Date, _: View, action: NavigateAction) => {
      const todayClicked = action === "TODAY";
      const isCurrentDateAlreadyToday = dayjs(date).isToday();
      if (todayClicked && isCurrentDateAlreadyToday) setView("day");
      setDate(newDate);
    },
    [setDate, setView, date],
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);

  const { min, max } = useMemo(() => {
    const min = new Date();
    const max = new Date();
    min.setHours(9, 0, 0);
    max.setHours(17, 0, 0);
    return {
      min,
      max,
    };
  }, []);

  const onSelectSlot = (slotInfo: SlotInfo) => {
    console.log(slotInfo);
  };

  const CalendarMain = BigCalendar<Appointment, Doctor>;

  return (
    <CalendarMain
      className={`rbc-calendar--${view}`}
      components={components}
      timeslots={4}
      step={15}
      events={events}
      showMultiDayTimes
      dayLayoutAlgorithm="overlap"
      localizer={localizer}
      resources={doctors}
      resourceIdAccessor="id"
      resourceTitleAccessor="name"
      view={view}
      views={["day", "work_week"]}
      onView={onView}
      date={date}
      onNavigate={onNavigate}
      onSelectSlot={onSelectSlot}
      min={min}
      max={max}
      selectable
    />
  );
}

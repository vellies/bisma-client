'use client'

import moment from 'moment';
import {
  USER,
  LOGIN,
  ORGANISATION,
  MANAGE,
  DASHBOARD,
  MY_CERTIFICATES,
  CATEGORY,
  PROGRAM,
  AUTHORIZED_BISMA,
  ADD,
  EDIT
} from "@@/utils/routeUtils";

const adminPageAccess = [
  ORGANISATION + DASHBOARD,
  ORGANISATION + CATEGORY, ORGANISATION + CATEGORY + ADD, ORGANISATION + CATEGORY + EDIT,
  ORGANISATION + PROGRAM, ORGANISATION + PROGRAM + ADD, ORGANISATION + PROGRAM + EDIT,
  ORGANISATION + AUTHORIZED_BISMA, ORGANISATION + AUTHORIZED_BISMA + ADD, ORGANISATION + AUTHORIZED_BISMA + EDIT,
];
const superAdminPageAccess = [
  '/manage/category'
];
const studentPageAccess = [
  ''
];

export const toastStyle = {
  style: {
    borderRadius: '10px',
    backgroundColor: "#242e4c",
    opacity: .5,
    color: '#fff',
  },
}

export const setItem = async (key: string, value: any) => {
  try {
    await null;
    return localStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getItem = async (key: string) => {
  try {
    await null;
    return localStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const getToken = () => {
  let accessToken = null;
  let isToken = localStorage.getItem("ckToken" || "");
  if (isToken !== null && isToken) {
    let tokenData = JSON.parse(isToken);
    if (tokenData !== null && tokenData.accessToken !== undefined) {
      accessToken = tokenData.accessToken;
    }
  }

  return accessToken;
};

export function validateFileExt(fileName: any, validFileExtensions: any[]) {
  if (fileName.length > 0) {
    let blnValid = false;
    for (let j = 0; j < validFileExtensions.length; j++) {
      let validExt = validFileExtensions[j];
      if (
        fileName
          .substr(fileName.length - validExt.length, validExt.length)
          .toLowerCase() === validExt.toLowerCase()
      ) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) return false;
  }
  return true;
}

export const getUpdatedClassroomObj = (crDataRes: any) => {
  return {
    _id: crDataRes._id,
    classroomName: crDataRes.classroomName,
    subject: crDataRes.subject,
    description: crDataRes.description,
    meetLink: crDataRes.meetLink,
    timetable: crDataRes.timetable,
    teacherId: crDataRes.teacherId,
    students: crDataRes.students,
  }
}

export const getCacheVariables = (store: any, fName: string, fsName?: string) => {
  let variableObj: any = null;
  const rootQueries = store.data.data.ROOT_QUERY;
  const rootQryKeys = Object.keys(rootQueries);
  let filteredQryKey: any[] = [];
  if (rootQryKeys.length > 0) {
    var secondarySrch = fsName || fName;
    filteredQryKey = rootQryKeys.filter(i => i.includes(fName) && i.includes(secondarySrch));
  }
  if (filteredQryKey.length > 0) {
    var funcName = filteredQryKey[0];
    const re = /{(.*)}/;
    const m = funcName.match(re);
    if (m != null) {
      variableObj = JSON.parse(`{${m[0].replace(re, '$1')}}`);
    }
  }

  return variableObj;
}


export const canAccess = (accountProfile: any, page: string) => {
  // console.log('==============================================');
  // console.log('ROLE ', accountProfile['userRole']);
  console.log('PAGE ', typeof (page), page);
  // console.log('==============================================');
  if (accountProfile && accountProfile['userRole'] && accountProfile['userRole'] === 'admin') {
    return page.includes('/organisation') ? true : false;
  } else if (accountProfile && accountProfile['userRole'] && accountProfile['userRole'] === 'superadmin') {
    return page.includes('/manage') ? true : false;
  } else if (accountProfile && accountProfile['userRole'] && (accountProfile['userRole'] === 'student')) {
    return page.includes('/user') ? true : false;
  } else {
    return false
  }
}


export const checkUserLoggedIn = () => {
  let token = localStorage.getItem('ckToken');
  if (token) {
    return true;
  } else {
    return false
  }
}

export const checkAndRedirectUserLogIn = (accountProfile: any, page: string) => {
  let logedInRole = accountProfile?.userRole
  let path = LOGIN
  if (logedInRole == 'admin') {
    path = ORGANISATION + DASHBOARD
  } else if (logedInRole == 'superadmin') {
    path = MANAGE + DASHBOARD
  } else if (logedInRole == 'student') {
    path = USER + MY_CERTIFICATES
  }
  return path;
}

export const checkUserRouter = async (accountProfile: any) => {
  let logedInRole = accountProfile?.userRole
  return logedInRole == 'admin' ? ORGANISATION :
    logedInRole == 'superadmin' ? MANAGE :
      logedInRole == 'student' ? USER : ''
}


export function serialNo(sno: any, activePage: any, length: number) {
  let page = parseInt(activePage) - 1
  let s_no = (length * (page)) + (parseInt(sno) + 1)
  return s_no
}

export function pageLengthList() {
  let pageLengthList = [
    { id: 1, key: 5, value: 5 },
    { id: 2, key: 10, value: 10 },
    { id: 3, key: 20, value: 20 },
    { id: 4, key: 50, value: 50 },
    { id: 5, key: 100, value: 100 },
  ]
  return pageLengthList;
}

export const statusView = (value: any) => {
  let message = ""
  if (value == 0) {
    message = "Pending"
  } else if (value == 1) {
    message = "Active"
  } else if (value == 2) {
    message = "Inactive"
  } else if (value == 3) {
    message = "Deleted"
  }
  return message;
};

export function inputStatus() {
  let inputStatus = [
    // { id: 1, key: "Pending", value: 0 },
    { id: 2, key: "Active", value: 1 },
    { id: 3, key: "Inactive", value: 2 },
  ]
  return inputStatus;
}
export function dateFormate(date: any) {
  let formatedDate = moment(new Date(date)).format('YYYY-MM-DD')
  return formatedDate;
};

export function dateFormateWithMonth(date: any) {
  let formatedDate = moment(new Date(date)).format('MMMM Do YYYY')
  return formatedDate;
};

export function timeFormate(time: any) {
  let formatedTime = moment(new Date(time)).format('hh:mm A')
  return formatedTime;
};

export function programDuration() {
  let programDuration = [
    { id: 1, key: "One Month", value: 'One Month' },
    { id: 2, key: "Two Months", value: 'Two Months' },
    { id: 3, key: "Three Months", value: 'Three Months' },
    { id: 4, key: "Six Months", value: 'Six Months' },
    { id: 4, key: "One Year", value: 'One Year' },
    { id: 4, key: "Two Years", value: 'Two Years' },
    { id: 4, key: "Three Years", value: 'Three Years' },
    { id: 4, key: "Four Years", value: 'Four Years' },
    { id: 4, key: "Five Years", value: 'Five Years' },
    { id: 4, key: "Six Years", value: 'Six Years' },
  ]
  return programDuration;
}

export function certificate() {
  let certificate = [
    { id: 1, key: "Lifetime Certificate", value: 'Lifetime Certificate' },
    { id: 2, key: "Periodic Certificate", value: 'Periodic Certificate' },
  ]
  return certificate;
}

export function grade() {
  let grade = [
    { id: 1, key: "CGPA", value: 'CGPA' },
    { id: 2, key: "Percentage", value: 'Percentage' },
    { id: 3, key: "Grade", value: 'Grade' },
    { id: 4, key: "Marks", value: 'Marks' },
    { id: 5, key: "Not Applicable", value: 'Not Applicable' },
  ]
  return grade;
}
export function requisiteType() {
  let requisiteType = [
    { id: 1, key: "Stream", value: 'Stream' },
    { id: 2, key: "Degree/Diploma", value: 'Degree/Diploma' },
    { id: 3, key: "Age", value: 'Age' },
    { id: 4, key: "Minimum Percentage", value: 'Minimum Percentage' },
    { id: 5, key: "Other", value: 'Other' },
  ]
  return requisiteType;
}
// sql语句
var sqlMap = {
  // 用户
  stu: {
    //增
    add: 'insert into t_studentinfo(student_id, class_id, name, Sex, Birthday, IdNum, Origin, PermanentAddress, HomeAddress, GraduatedSchool_name, GraduatedSchool_address, LastSchool_name, LastSchool_address, DisabilityCertificate_issueDate, DisabilityCertificate_number, DisabilityCertificate_validity, Disability_type, Disability_level, EducationalSetting, SpecialIllnessOrOthers, MainCaregiver, ParentsPS, ParentsPS_proofMaterials, RelativesPS, StuResident, SojournRela, EmergencyContact1_name, EmergencyContact1_rela, EmergencyContact1_birth, EmergencyContact1_degree, EmergencyContact1_job, EmergencyContact1_health, EmergencyContact1_tel, EmergencyContact2_name, EmergencyContact2_rela, EmergencyContact2_birth, EmergencyContact2_degree, EmergencyContact2_job, EmergencyContact2_health, EmergencyContact2_tel, EmergencyContact3_name, EmergencyContact3_rela, EmergencyContact3_birth, EmergencyContact3_degree, EmergencyContact3_job, EmergencyContact3_health, EmergencyContact3_tel, FamilyFinancialSituation, ParentsMarriageSituation, UsualLanguage, ResidentialEnvironment, FamilyEnvironment, FamilyAttitude2Stu, SleepPattern, LivingHabit, IQ, FamilyMember, FamilyMember_obro, FamilyMember_ybro, FamilyMember_osis, FamilyMember_ysis, FamilyMember_livetogether, WorkChance1_name, WorkChance1_address, WorkChance1_tel, WorkChance1_jobDescription, WorkChance1_transport, WorkChance2_name, WorkChance2_address, WorkChance2_tel, WorkChance2_jobDescription, WorkChance2_transport, WorkChance3_name, WorkChance3_address, WorkChance3_tel, WorkChance3_jobDescription, WorkChance3_transport, WorkChance4_name, WorkChance4_address, WorkChance4_tel, WorkChance4_jobDescription, WorkChance4_transport, WorkChance5_name, WorkChance5_address, WorkChance5_tel, WorkChance5_jobDescription, WorkChance5_transport, RelProject)' +
      'values (' +
      '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,' +
      '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,' +
      '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,' +
      '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,' +
      '?, ?, ?, ?, ?, ?, ?, ?' +
      ')',
    addMD:'update t_studentinfo set MedicalDiagnosis = ? where student_id = ? and Deleted = 0',
    addHBI:'update t_studentinfo set HomeBasicInfo = ? where student_id = ? and Deleted = 0',
    addE:'update t_studentinfo set Evaluation = ? where student_id = ? and Deleted = 0',
    addATI:'update t_studentinfo set AllTargetInfo = ? where student_id = ? and Deleted = 0',
    addIepMeeting:'insert into iepmeeting(schoolYear, term, stuName, stuID, creator, date, summary) values (?, ?, ?, ?, ?, ?, ?)', 
    addGroupSbjPl:'insert into groupsubjectplan(schoolYear, term, class, subject, teacher, createDate, updateDate, teachingPlan, teachingProgress) values(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    addTrainingSbjPl:'insert into trainingsubjectplan(schoolYear, term, class, stuName, student_info, subject, teacher, createDate, updateDate, teachingPlan, teachingProgress) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    addTeachingTheme:'insert into teachingtheme(course, theme, schoolYear, term, month, mainTeacher, aidTeacher, class, timeArrange, teachingAim, details, teachingProcess) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    addGroupSbjIns:'insert into groupsubjectinstruction(schoolYear, term, class, subject, teacher, createDate, week, section, topic, content) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    addTrainingSbjIns:'insert into trainingsubjectinstruction(schoolYear, term, class, stuName, subject, teacher, createDate, week, section, topic, content) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    addLearningReports:'insert into learningreports(schoolYear, term, class, stuName, stuInfo, months) values(?, ?, ?, ?, ?, ?)',
    addPeriodicAccess:'insert into periodicaccess(stuName, stuID, term, schoolYear, class, teacher, analysisTime, targetResult, subjectResult, courseResult, treatmentResult, lifeDes, mainProblem, mainDemand, eduFocus, moreTarget, teachingStrategy, relatedService) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    addMPH:'insert into t_motherpregnancyhistory(stuID) values (?)',
    addSP:'insert into t_studentpreferences(stuID) values (?)',
    addSOH:'insert into t_stateofhealth(stuID) values (?)',
    addAS1:'insert into t_abilitystatus1(stuID) values (?)',
    addAS2:'insert into t_abilitystatus2(stuID) values (?)',

    //删
    delStu: 'update t_studentinfo set Deleted = 1 where student_id = ?',
    delIepMeeting:'update iepmeeting set isDel = 1 where id = ?', 
    delGroupSbjPl:'update groupsubjectplan set isDel = 1 where id = ?', 
    delTrainingSbjPl:'update trainingsubjectplan set isDel = 1 where id = ?', 
    delTeachingTheme:'update teachingtheme set isDel = 1 where id = ?', 
    delGroupSbjIns:'update groupsubjectinstruction set isDel = 1 where id = ?', 
    delTrainingSbjIns:'update trainingsubjectinstruction set isDel = 1 where id = ?',
    delLearningReports:'update learningreports set isDel = 1 where id = ?',
    delPeriodicAccess:'update periodicaccess set isDel = 1 where id = ?',
    delMPH:'delete from t_motherpregnancyhistory where stuID = ?',
    delSP:'delete from t_studentpreferences where stuID=?',
    delSOH:'delete from t_stateofhealth where stuID=?',
    delAS1:'delete from t_abilitystatus1 where stuID=?',
    delAS2:'delete from t_abilitystatus2 where stuID=?',

    //改
    updateStu: 'update t_studentinfo set student_id=?, class_id=?, name=?, Sex=?, Birthday=?, IdNum=?, Origin=?, PermanentAddress=?, HomeAddress=?, GraduatedSchool_name=?, GraduatedSchool_address=?, LastSchool_name=?, LastSchool_address=?, DisabilityCertificate_issueDate=?, DisabilityCertificate_number=?, DisabilityCertificate_validity=?, Disability_type=?, Disability_level=?, EducationalSetting=?, SpecialIllnessOrOthers=?, MainCaregiver=?, ParentsPS=?, ParentsPS_proofMaterials=?, RelativesPS=?, StuResident=?, SojournRela=?, EmergencyContact1_name=?, EmergencyContact1_rela=?, EmergencyContact1_birth=?, EmergencyContact1_degree=?, EmergencyContact1_job=?, EmergencyContact1_health=?, EmergencyContact1_tel=?, EmergencyContact2_name=?, EmergencyContact2_rela=?, EmergencyContact2_birth=?, EmergencyContact2_degree=?, EmergencyContact2_job=?, EmergencyContact2_health=?, EmergencyContact2_tel=?, EmergencyContact3_name=?, EmergencyContact3_rela=?, EmergencyContact3_birth=?, EmergencyContact3_degree=?, EmergencyContact3_job=?, EmergencyContact3_health=?, EmergencyContact3_tel=?, FamilyFinancialSituation=?, ParentsMarriageSituation=?, UsualLanguage=?, ResidentialEnvironment=?, FamilyEnvironment=?, FamilyAttitude2Stu=?, SleepPattern=?, LivingHabit=?, IQ=?, FamilyMember=?, FamilyMember_obro=?, FamilyMember_ybro=?, FamilyMember_osis=?, FamilyMember_ysis=?, FamilyMember_livetogether=?, WorkChance1_name=?, WorkChance1_address=?, WorkChance1_tel=?, WorkChance1_jobDescription=?, WorkChance1_transport=?, WorkChance2_name=?, WorkChance2_address=?, WorkChance2_tel=?, WorkChance2_jobDescription=?, WorkChance2_transport=?, WorkChance3_name=?, WorkChance3_address=?, WorkChance3_tel=?, WorkChance3_jobDescription=?, WorkChance3_transport=?, WorkChance4_name=?, WorkChance4_address=?, WorkChance4_tel=?, WorkChance4_jobDescription=?, WorkChance4_transport=?, WorkChance5_name=?, WorkChance5_address=?, WorkChance5_tel=?, WorkChance5_jobDescription=?, WorkChance5_transport=?, RelProject=? where id = ? and Deleted = 0',
    upIni1:'update t_studentinfo set IsTargetInitialized = 1 where student_id = ? and Deleted = 0',
    stuCourseCl:'update t_studentinfo set Courses = null where student_id = ? and Deleted = 0',
    upStuCourse:'update t_studentinfo set Courses = ? where student_id = ? and Deleted = 0',
    upIepMeeting:'update iepmeeting set schoolYear=?, term=?, stuName=?, stuID=?, creator=?, date=?, summary=? where id = ? and isDel = 0', 
    upGroupSbjPl:'update groupsubjectplan set schoolYear=?, term=?, class=?, subject=?, teacher=?, createDate=?, updateDate=?, teachingPlan=?, teachingProgress=? where id = ? and isDel = 0', 
    upTrainingSbjPl:'update trainingsubjectplan set schoolYear=?, term=?, class=?, stuName=?, student_info=?, subject=?, teacher=?, createDate=?, updateDate=?, teachingPlan=?, teachingProgress=? where id = ? and isDel = 0',
    upTeachingTheme:'update teachingtheme set course=?, theme=?, schoolYear=?, term=?, month=?, mainTeacher=?, aidTeacher=?, class=?, timeArrange=?, teachingAim=?, details=?, teachingProcess=? where id = ? and isDel = 0', 
    upGroupSbjIns:'update groupsubjectinstruction set schoolYear=?, term=?, class=?, subject=?, teacher=?, createDate=?, week=?, section=?, topic=?, content=? where id = ? and isDel = 0', 
    upTrainingSbjIns:'update trainingsubjectinstruction set schoolYear=?, term=?, class=?, stuName=?, subject=?, teacher=?, createDate=?, week=?, section=?, topic=?, content=? where id = ? and isDel = 0',
    upLearningReports:'update learningreports set schoolYear=?, term=?, class=?, stuName=?, stuInfo=?, months=? where id = ? and isDel = 0',
    upPeriodicAccess:'update periodicaccess set stuName=?, stuID=?, term=?, schoolYear=?, class=?, teacher=?, analysisTime=?, targetResult=?, subjectResult=?, courseResult=?, treatmentResult=?, lifeDes=?, mainProblem=?, mainDemand=?, eduFocus=?, moreTarget=?, teachingStrategy=?, relatedService=? where id = ? and isDel = 0',
    upMPH:'update t_motherpregnancyhistory set PregnancyHistory1=?,PregnancyHistory2=?,PregnancyHistory2Other=?,PregnancyHistory3=?,PregnancyHistory4=?,PregnancyHistory5=?,PregnancyHistory5Other=?,ChildDevelopment1=?,ChildDevelopment2=?,ChildDevelopment3=?,MedicalHistory1=?,MedicalHistory2=?,MedicalHistory3=? where stuID = ?',
    upSP:'update t_studentpreferences set FavoriteFood=?,FoodOther=?,FavoriteDrink=?,DrinkOther=?,FavoriteThings=?,ThingsOther=?,FavoriteSports=?,SportsOther=?,FavoriteActivities=?,ActivitiesOther=?,FavoriteEnhance=?,EnhanceOther=?,OtherHappyReasons=?,FavoritePerson=?,AnnoyingPerson=?,AnnoyingFood=?,AnnoyingActivities=?,AnnoyingThings=?,OtherUnhappyReasons=?,SpecialEatingHabits=?,EatingHabitsExplanation=?,SpecialHobbiesOrBehaviors=?,OtherAdvices=? where stuID=?',
    upSOH:'update t_stateofhealth set Height=?,Weight=?,Vision=?,NakedSightL=?,NakedSightR=?,CorrectedSightL=?,CorrectedSightR=?,VisualImpairmentL=?,VisualImpairmentR=?,VisualImpairmentReason=?,VisualImpairmentReasonOther=?,Hearing=?,HearingImpairmentL=?,HearingImpairmentR=?,HearingImpairmentReason=?,HearingImpairmentReasonOther=?,Language=?,LanguageDisability=?,LanguageDisabilityReason=?,LanguageDisabilityReasonOther=?,PhysicalStatus=?,PhysicalDisability=?,PhysicalDisabilityReason=?,PhysicalDisabilityReasonOther=?,PhysicalDisabilityType=?,PhysicalDisabilityTypeOther=?,SpecialDisease=?,SpecialDiseaseName=?,MedicationStatus=?,MentalStatus=?,MentalStatusOther=?,Other=? where stuID=?',
    upAS1:'update t_abilitystatus1 set Cognition=?,CognitionOther=?,OralCavity=?,SwallowFunction=?,SwallowFunctionOther=?,LanguageComprehension=?,LanguageComprehensionOther=?,LanguageExpression=?,LanguageExpression1=?,LanguageExpression2=?,LanguageExpression3=?,LanguageExpression4=?,LanguageExpression5=?,LanguageExpression6=?,LanguageExpressionOther=?,Chinese=?,ChineseOther=?,Math=?,MathOther=? where stuID=?',
    upAS2:'update t_abilitystatus2 set Eating=?,EatingOther=?,DressAndUndress=?,DressAndUndressOther=?,PoopAndPee=?,PoopAndPeeOther=?,Cleanliness=?,CleanlinessFemale=?,CleanlinessFemaleOther=?,HaveMenstruation=?,CleanlinessOther=?,CleanOther=?,CleanOtherOther=?,SocializationAndBehavior=?,SocializationAndBehaviorOther=?,ActionDevelopmentBig=?,ActionDevelopmentBigOther=?,ActionDevelopmentSmall=?,ActionDevelopmentSmallOther=?,OtherAbilities=?,OtherAbilitiesOther=? where stuID=?',
    setStuFuBiao:'update t_studentinfo set FuBiao=? where student_id=? and Deleted=0',

    //查
    queSch: 'select * from school_target where target_status = 1',
    queStu: 'select * from t_studentinfo where Deleted = 0', 
    queStuinfo: 'SELECT * FROM t_studentinfo WHERE student_id = ? AND Deleted = 0',
    queClass:'select student_id,name from t_studentinfo where class_id = ? and Deleted = 0',
    queCourse:'SELECT * FROM coursemanagement WHERE delete_status = 0',
    queCourseCategeories:'SELECT * FROM coursemanagement WHERE show_type = 0 AND father = 0 AND delete_status = 0 AND producerId = ?',
    queSS:'SELECT * FROM coursemanagement WHERE delete_status = 0 and show_type = ? and father = ?',
    queSS_ST:'SELECT * FROM coursemanagement WHERE delete_status = 0 and show_type = ?',
    queName: 'select student_id, name, sex from t_studentinfo where name = ? and Deleted = 0',
    queStuCourse:'SELECT Courses FROM t_studentinfo WHERE Deleted = 0', 
    queIepMeeting:'select id, schoolYear, term, stuID, stuName, creator, date from iepmeeting where isDel = 0', 
    queFullIepMeeting:'select * from iepmeeting where isDel = 0 and id = ?', 
    queGroupSbjPlan:'select id, schoolYear, term, class, subject, teacher, createDate, updateDate from groupsubjectplan where isDel = 0', 
    queFullGroupSbjPl:'select * from groupsubjectplan where isDel = 0 and id = ?',
    queClassGSP:'select * from groupsubjectplan where schoolYear = ? and subject = ? and class = ? and term = ? and teacher = ? and isDel = 0',
    queClassTSP:'select * from trainingsubjectplan where schoolYear = ? and subject = ? and class = ? and term = ? and teacher = ? and isDel = 0',
    queTrainingSbjPlan:'select id, schoolYear, term, class, stuName, subject, teacher, createDate, updateDate from trainingsubjectplan where isDel = 0', 
    queFullTrainingSbjPl:'select * from trainingsubjectplan where isDel = 0 and id = ?',
    queFullTSP4LR:'select teachingPlan from trainingsubjectplan where schoolYear = ? and term = ? and class = ? and stuName = ? and isDel = 0',
    queTeachingTheme:'select * from teachingtheme where isDel = 0',
    queFullTeachingTheme:'select * from teachingtheme where isDel = 0 and id = ?', 
    queGroupSbjIns:'select id, class, subject, topic, teacher, week, section from groupsubjectinstruction where isDel = 0', 
    queFullGroupSbjIns:'select * from groupsubjectinstruction where id = ? and isDel = 0', 
    queTrainingSbjIns:'select id, class, subject, topic, stuName, teacher, week, section from trainingsubjectinstruction where isDel = 0', 
    queFullTrainingSbjIns:'select * from trainingsubjectinstruction where id = ? and isDel = 0',
    queSchedule:'select * from schedule where student_id = ? and year = ? and semester = ?',
    queLearningReports:'select id, schoolYear, term, class, stuName from learningreports where isDel = 0',
    queFullLR:'select * from learningreports where id = ? and isDel = 0',
    queExistLR:'select * from learningreports where schoolYear = ? and term = ? and class = ? and stuInfo = ? and isDel = 0',
    queSchoolTeachers:'select id, userName from userstable where schools = ? and `default` = 1',
    queSubject:'select id, subjectName from subjecttable where `default` = 1',
    queClasstable:'select * from classtable where schoolName = ? and `default` = 1',
    quePeriodicAccess:'select * from periodicaccess where id = ? and isDel = 0',
    quePeriodicAccessList:'select id, schoolYear, term, class, stuName, analysisTime from periodicaccess where isDel = 0',
    queMPH:'select * from t_motherpregnancyhistory where stuID=?',
    queSP:'select * from t_studentpreferences where stuID=?',
    queSOH:'select * from t_stateofhealth where stuID=?',
    queAS1:'select * from t_abilitystatus1 where stuID=?',
    queAS2:'select * from t_abilitystatus2 where stuID=?',
  }
};

module.exports = sqlMap;

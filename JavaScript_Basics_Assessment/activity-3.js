const studentName=['Thomas', 'Jacob', 'Ryan'];

for (let i=0; i < 3; i++){
  const newName=prompt('Enter a Student Name');
  studentName.push(newName);
}

for (let i=0; i < studentName.length; i++){
  console.log(studentName[i]);
}
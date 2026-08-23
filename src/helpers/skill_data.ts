import android from '../images/languages/android.svg';
import azure from '../images/languages/azure.svg';
import c from '../images/languages/c.svg';
import cpp from '../images/languages/cpp.svg';
import csharp from '../images/languages/csharp.svg';
import css from '../images/languages/css.svg';
import database from '../images/languages/database.svg';
import django from '../images/languages/django.svg';
import docker from '../images/languages/docker.svg';
import firebase from '../images/languages/firebase.svg';
import git from '../images/languages/git.svg';
import github from '../images/languages/github_1.svg';
import html from '../images/languages/html.svg';
import java from '../images/languages/java.svg';
import javascript from '../images/languages/javascript.svg';
import typescript from '../images/languages/typescript.svg';
import kotlin from '../images/languages/kotlin.svg';
import material_ui from '../images/languages/material-ui.png';
import mongodb from '../images/languages/mongodb.svg';
import mysql from '../images/languages/mysql.svg';
import node from '../images/languages/nodejs_alt.svg';
import python from '../images/languages/python.svg';
import react from '../images/languages/react.svg';
import react_bootstrap from '../images/languages/react_bootstrap.png';
import visual_studio from '../images/languages/visualstudio.svg';
import vscode from '../images/languages/vscode.svg';
import gcp from '../images/languages/gcp.svg';
import springboot from '../images/languages/springboot.svg';
import agentplatform from '../images/languages/agentplatform.svg';
import gcs from '../images/languages/gcs.svg';
import bigquery from '../images/languages/bigquery.svg';
import { Skill } from '../types';

const skill_data: Skill[] = [
  // Languages
  { id: 1, name: 'TypeScript', img: typescript, category: 'Languages' },
  { id: 2, name: 'JavaScript', img: javascript, category: 'Languages' },
  { id: 3, name: 'Java', img: java, category: 'Languages' },
  { id: 4, name: 'Kotlin', img: kotlin, category: 'Languages' },
  { id: 5, name: 'Python', img: python, category: 'Languages' },
  { id: 6, name: 'C', img: c, category: 'Languages' },
  { id: 7, name: 'C++', img: cpp, category: 'Languages' },
  { id: 8, name: 'C#', img: csharp, category: 'Languages' },
  { id: 9, name: 'HTML5', img: html, category: 'Languages' },
  { id: 10, name: 'CSS3', img: css, category: 'Languages' },

  // Frontend
  { id: 11, name: 'React', img: react, category: 'Frontend' },
  { id: 12, name: 'Material UI', img: material_ui, category: 'Frontend' },
  { id: 13, name: 'React Bootstrap', img: react_bootstrap, category: 'Frontend' },

  // Backend & Cloud Technologies
  { id: 14, name: 'Spring Boot', img: springboot, category: 'Backend & Cloud' },
  { id: 15, name: 'Google Cloud', img: gcp, category: 'Backend & Cloud' },
  { id: 16, name: 'Microsoft Azure', img: azure, category: 'Backend & Cloud' },
  { id: 17, name: 'Google Cloud Storage', img: gcs, category: 'Backend & Cloud' },
  { id: 18, name: 'Node.js', img: node, category: 'Backend & Cloud' },
  { id: 19, name: 'Django', img: django, category: 'Backend & Cloud' },
  { id: 20, name: 'Firebase', img: firebase, category: 'Backend & Cloud' },

  // AI & Data Systems
  { id: 21, name: 'Agent Platform (Vertex AI)', img: agentplatform, category: 'AI & Data Systems' },
  { id: 22, name: 'BigQuery - ML/AI', img: bigquery, category: 'AI & Data Systems' },
  { id: 23, name: 'Oracle', img: database, category: 'AI & Data Systems' },
  { id: 24, name: 'MySQL', img: mysql, category: 'AI & Data Systems' },
  { id: 25, name: 'MongoDB', img: mongodb, category: 'AI & Data Systems' },

  // DevOps & Tools
  { id: 26, name: 'Docker', img: docker, category: 'DevOps & Tools' },
  { id: 27, name: 'Git', img: git, category: 'DevOps & Tools' },
  { id: 28, name: 'GitHub', img: github, category: 'DevOps & Tools' },
  { id: 29, name: 'Android Studio', img: android, category: 'DevOps & Tools' },
  { id: 30, name: 'VS Code', img: vscode, category: 'DevOps & Tools' },
  { id: 31, name: 'Visual Studio', img: visual_studio, category: 'DevOps & Tools' },
];

export default skill_data;

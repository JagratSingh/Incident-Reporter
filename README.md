### **Task 2: Incident Reporting Tool**
Add this to your readme file.

#### **Story:**

You are tasked with developing an **Incident Reporting Tool** using **Angular** for the front end and **Firebase** for backend services. The application is designed to streamline the reporting and resolution of incidents within an organization, ensuring efficient role-based workflows.

---

### **Story Flow**

#### **1. Project Setup (10%)**

- Use Angular as the front-end framework and Firebase for authentication, Firestore as the database, and Firebase Hosting for deployment.  
- Configure Firebase services to handle authentication and real-time data synchronization.  
- Install a UI library of your choice (Angular Material, Tailwind CSS, or Ionic) for styling and UI components.  

---

#### **2. Authentication & Authorization (15%)**

- **Login Scenarios:**  
  1. **Scenario 1:** A user logs in with their mobile number and receives an OTP. After entering the correct OTP, they are directed to their dashboard based on their role (Admin or Reporter).  
  2. **Scenario 2:** A user logs in with an invalid OTP, and an error message is displayed.   

- **Auth Guards:**  
  - Protect admin routes like **incident assignment and resolution**.  
  - Restrict reporters to their own incident reports.  

---

#### **3. User Interface (15%)**

- **Admin UI Features:**  
  - Dashboard: Displays all incidents categorized by status (Open, In Progress, Resolved).  
  - Forms for assigning incidents to reporters and marking incidents as resolved.  
  - List of reporters with their assigned incidents.  

- **Reporter UI Features:**  
  - Dashboard: Displays incidents reported by them with details like description, priority, and status.  
  - Ability to update the status of incidents (e.g., "In Progress") and add comments.  

- **UI Expectations:**  
  - Use a clean and responsive design.  
  - Include visual indicators for incident priority (e.g., Low, Medium, High).  

---

#### **4. Problem Solving (15%)**

- Implement logic for **incident reporting and tracking**:  
  - Admins can view all incidents and assign them to reporters.  
  - Reporters can update incident statuses and add resolution comments.  

- **Edge Case Handling:**  
  - Prevent duplicate incident reports by validating the description and reporter information.  
  - Ensure reporters cannot edit or delete incidents assigned to others.  

---

#### **5. Role-Based CRUD Operations (10%)**

- Admins can:  
  - Create, view, and assign incidents.  
  - Resolve incidents.  

- Reporters can:  
  - Report new incidents.  
  - Update the status and add comments to their assigned incidents.  

---

#### **6. Angular & TypeScript Concepts (10%)**

- **Services:** Create `IncidentService` and `AuthService` for managing incidents and authentication.  
- **Interfaces:** Define `Incident` and `User` interfaces for strongly typed data models.  
- **Lifecycle Hooks:** Use `ngOnInit` to fetch incidents and users.  
- **Pipes:** Create a custom pipe to filter incidents by priority or status.  

---

#### **7. Coding Standards (10%)**

- Follow Osmosys Angular standards for:  
  - Modular structure: Separate modules for authentication and incident management.  
  - Consistent naming conventions.  
  - Clear and concise comments for code readability.  

---

#### **8. Code Quality (5%)**

- Focus on reusability:  
  - Use shared components for incident cards and forms.  
  - Implement reusable validation logic for forms.  

---

#### **9. Deployment & Submission (10%)**

- Deploy the application using Firebase Hosting.  
- Use Git for version control with regular commits and well-written commit messages.  
- Submit the project by pushing the code to a GitHub repository.  

---

### **Dummy Data**

**Users:**  
- **Admin:**  
  - Name: Alice Admin  
  - Mobile: +919876543210  
  - Role: Admin  

- **Reporters:**  
  - Name: Bob Reporter  
  - Mobile: +919123456789  
  - Role: Reporter  
  - Name: Charlie Reporter  
  - Mobile: +919234567890  
  - Role: Reporter  

**Incidents:**  
1. **Incident:** Water Leakage in Office  
   - **Priority:** High  
   - **Reported By:** Bob Reporter  
   - **Status:** Open  

2. **Incident:** Broken Monitor  
   - **Priority:** Medium  
   - **Reported By:** Charlie Reporter  
   - **Status:** In Progress  

---

### **Expected Deliverables**

1. A fully functional incident reporting tool meeting all requirements.  
2. Role-based dashboards for admins and reporters.  
3. Proper implementation of Firebase services for authentication and Firestore for database operations.  
4. Clean and modular code adhering to Osmosys standards.  
5. Hosted application URL and GitHub repository link.  

---

### **Marks Distribution**  

| **Criteria**                      | **Marks** |  
|------------------------------------|-----------|  
| Project Setup                      | 10 Marks  |  
| Authentication & Authorization     | 15 Marks  |  
| UI Design                          | 15 Marks  |  
| Problem Solving                    | 15 Marks  |  
| Role-Based CRUD                    | 10 Marks  |  
| Angular & TypeScript Concepts      | 10 Marks  |  
| Coding Standards                   | 10 Marks  |  
| Code Quality                       | 5 Marks   |  
| Deployment & Submission            | 10 Marks  |  

**Total:** 100 Marks  
**Pass Marks:** 70 Marks  


## **Evaluation Criteria and Rules**  

To successfully complete the assigned project and achieve a passing score, developers must adhere to the following evaluation criteria. Each criterion is designed to assess specific skills and competencies in Angular and Firebase development, along with adherence to coding standards and best practices.  

---

### **Evaluation Criteria**  

1. **Project Setup (Angular + Firebase) – 10%**  
   - The project must be properly set up using Angular as the front end and Firebase for backend services such as authentication, Firestore for data storage, and hosting.  
   - Ensure all dependencies are installed, and the environment is configured correctly for seamless integration with Firebase.  

2. **User Authentication + Authorization (Auth Guard + Routing Configs) – 15%**  
   - Implement a robust authentication system using Firebase Authentication (email/mobile login with OTP).  
   - Authorization should be role-based, with proper routing guards to restrict access based on user roles (e.g., Admin, User).  

3. **UI (User + Admin) – 15%**  
   - Design a responsive and user-friendly interface for Admin and User dashboards.  
   - Ensure proper navigation, intuitive layout, and a consistent theme throughout the application.  

4. **Problem Solving – 15%**  
   - Demonstrate logical and efficient solutions for the given problem scenarios.  
   - Implement dynamic features such as form validation, real-time updates, and user-friendly workflows.  

5. **Role-Based CRUD – 10%**  
   - Implement Create, Read, Update, and Delete (CRUD) functionalities based on user roles.  
   - Admins should manage users and tasks, while Users should interact with their assigned data.  

6. **Angular + TypeScript Concepts – 10%**  
   - Use Angular concepts such as Services, Lifecycle Hooks, and Pipes effectively.  
   - Utilize TypeScript features like interfaces, generics, and strong typing to ensure clean and maintainable code.  

7. **Coding Standards – 10%**  
   - Follow Osmosys GitHub coding standards for Angular development.  
   - Ensure proper file structure, modularization, naming conventions, and inline documentation.  

8. **Code Quality – 5%**  
   - Write reusable, optimized, and clean code.  
   - Avoid redundancy and ensure scalability in the implemented features.  

9. **Deployment + Submission – 10%**  
   - Successfully deploy the project on Firebase Hosting without errors or bugs.  
   - Ensure proper Git usage, including regular commits, meaningful commit messages, and adherence to GitHub standards.  

---

### **Rules**  

1. **Time Management**:  
   - The test duration is **6 hours** (1:00 PM - 7:00 PM).  
   - Projects must be submitted by **7:30 PM**. Late submissions will not be accepted.  

2. **Submission Guidelines**:  
   - Projects should be submitted as a GitHub repository link, including the deployed Firebase URL.  
   - Ensure all necessary files and documentation are included in the repository.  

3. **Usage of AI Tools**:  
   - The use of generative AI tools (e.g., ChatGPT, Gemini, or similar AI-based extensions) is strictly prohibited.  
   - However, developers are allowed to refer to official documentation and online resources for help.  

4. **Teamwork**:  
   - Projects must be completed individually. Collaboration with other developers is not permitted.  

5. **Bug-Free Completion**:  
   - Ensure the application is functional and free of critical bugs. Applications with unresolved errors will receive penalties in the final score.  

6. **Pass Marks**:  
   - A minimum score of **70 marks** is required to pass.  
   - Passing developers will be recommended for project assignments, while those who fail will undergo an additional **7-10 days of training**.  

By adhering to these guidelines and evaluation criteria, developers can demonstrate their competency in Angular development, Firebase integration, and project management.

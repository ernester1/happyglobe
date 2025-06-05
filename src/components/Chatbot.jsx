import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userType, setUserType] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const messagesEndRef = useRef(null);

  const jobSeekerQuestions = [
    "How do I apply for a job?",
    "What documents do I need to apply?",
    "How can I improve my resume?",
    "What are common interview questions?",
    "How do I negotiate salary?",
    "How to write a cover letter?",
    "What should I wear to an interview?",
    "How to follow up after an interview?",
    "How to search for remote jobs?",
    "What are red flags in job postings?"
  ];

  const employerQuestions = [
    "How do I post a job opening?",
    "What should I include in a job description?",
    "How can I attract better candidates?",
    "What are effective interview techniques?",
    "How do I assess candidate skills?",
    "How to conduct remote interviews?",
    "What benefits should I offer?",
    "How to write an attractive job title?",
    "How to screen resumes effectively?",
    "What legal considerations should I know?"
  ];

  const responses = {
    // Job Seeker Responses
    "How do I apply for a job?": "To apply for jobs on Happy Globe:\n\n1. Create a complete profile with your skills and experience\n2. Browse available positions using our search filters\n3. Click 'Apply Now' on jobs that match your interests\n4. Submit required documents (resume, cover letter)\n5. Track your applications in your dashboard\n\nTip: Tailor your application to each specific role for better results!",
    
    "What documents do I need to apply?": "Essential documents for job applications:\n\n📄 **Required:**\n• Updated resume/CV\n• Professional cover letter\n• Contact references (2-3 people)\n\n📋 **Often Requested:**\n• Portfolio or work samples\n• Certifications or licenses\n• Academic transcripts\n• Letter of recommendation\n\nAlways check the specific job posting for exact requirements!",
    
    "How can I improve my resume?": "Resume improvement tips:\n\n✨ **Content:**\n• Use action verbs (achieved, managed, developed)\n• Include quantifiable achievements\n• Tailor keywords to job descriptions\n• Keep it concise (1-2 pages)\n\n🎨 **Format:**\n• Use clean, professional layout\n• Ensure consistent formatting\n• Use bullet points for readability\n• Save as PDF to preserve formatting\n\n🔍 **Review:**\n• Proofread for spelling/grammar\n• Get feedback from others\n• Update regularly",
    
    "What are common interview questions?": "Common interview questions with tips:\n\n🤔 **Tell me about yourself**\n→ Brief professional summary focusing on relevant experience\n\n💪 **Strengths and weaknesses**\n→ Honest strengths with examples; weaknesses you're actively improving\n\n🎯 **Why this job/company?**\n→ Show research about company and genuine interest\n\n📈 **Where do you see yourself in 5 years?**\n→ Align goals with potential career path at company\n\n❓ **Questions for us?**\n→ Always have thoughtful questions prepared!",
    
    "How do I negotiate salary?": "Salary negotiation strategy:\n\n📊 **Research First:**\n• Use salary comparison websites\n• Consider location and experience level\n• Know industry standards\n\n💬 **Negotiation Tips:**\n• Wait for job offer before discussing salary\n• Consider total compensation package\n• Be professional and confident\n• Have a realistic range in mind\n• Don't accept immediately - ask for time to consider\n\n🎁 **Beyond Salary:**\n• Vacation time\n• Remote work options\n• Professional development\n• Health benefits",

    "How to write a cover letter?": "Cover letter best practices:\n\n📝 **Structure:**\n• Header with contact info\n• Personalized greeting (research hiring manager's name)\n• Opening paragraph: Position + brief interest statement\n• Body: Relevant experience + achievements\n• Closing: Call to action + professional sign-off\n\n✨ **Tips:**\n• Keep it to one page\n• Match company's tone and values\n• Don't repeat your resume\n• Show personality while staying professional\n• Proofread carefully",

    "What should I wear to an interview?": "Interview attire guide:\n\n👔 **Business Formal:**\n• Suit and tie (men) / Suit or professional dress (women)\n• Conservative colors (navy, black, gray)\n• Polished shoes\n\n👕 **Business Casual:**\n• Dress shirt/blouse with slacks/skirt\n• Optional blazer\n• Clean, professional appearance\n\n💡 **General Tips:**\n• Research company culture beforehand\n• When in doubt, dress one level above company norm\n• Ensure clothes fit well and are wrinkle-free\n• Minimal jewelry and fragrance",

    "How to follow up after an interview?": "Post-interview follow-up:\n\n📧 **Thank You Email (within 24 hours):**\n• Thank interviewer for their time\n• Reiterate interest in position\n• Address any concerns raised\n• Keep it brief and professional\n\n⏰ **Timeline:**\n• Wait 1-2 weeks before additional follow-up\n• Send polite status inquiry\n• Don't be pushy or impatient\n\n📞 **If No Response:**\n• One final follow-up after 2-3 weeks\n• Then move on to other opportunities",

    "How to search for remote jobs?": "Remote job search strategies:\n\n🌐 **Where to Look:**\n• Remote-specific job boards (We Work Remotely, Remote.co)\n• Filter for 'remote' on major job sites\n• Company websites with remote-first culture\n• Freelance platforms for contract work\n\n🔍 **Search Tips:**\n• Use keywords: 'remote', 'work from home', 'distributed team'\n• Check if position is fully remote vs. hybrid\n• Verify time zone requirements\n\n💼 **Application Tips:**\n• Highlight remote work experience\n• Demonstrate self-motivation and communication skills\n• Show familiarity with remote collaboration tools",

    "What are red flags in job postings?": "Job posting red flags to avoid:\n\n🚩 **Compensation Issues:**\n• No salary range mentioned\n• 'Competitive salary' without specifics\n• Commission-only positions disguised as salary\n• Unpaid 'trial periods'\n\n🚩 **Vague Descriptions:**\n• Unclear job responsibilities\n• 'Wear many hats' (could mean unrealistic workload)\n• Too-good-to-be-true promises\n\n🚩 **Pressure Tactics:**\n• 'Urgent' hiring for non-urgent roles\n• Immediate start required\n• Request for personal/financial information upfront\n\n🚩 **Communication:**\n• Poor grammar/spelling in posting\n• Generic company descriptions\n• No company contact information",

    // Employer Responses
    "How do I post a job opening?": "Steps to post a job on Happy Globe:\n\n📝 **Job Posting Process:**\n1. Log into your employer account\n2. Click 'Post New Job' in your dashboard\n3. Fill out job details:\n   • Job title and department\n   • Detailed description and responsibilities\n   • Required qualifications and skills\n   • Salary range and benefits\n   • Location and work arrangement\n\n🔍 **Review Process:**\n• Our team reviews postings within 24 hours\n• You'll receive confirmation once approved\n• Jobs stay active for 30 days (renewable)\n\n💡 **Pro Tip:** Include company culture information to attract better matches!",
    
    "What should I include in a job description?": "Complete job description checklist:\n\n📋 **Essential Elements:**\n• Clear, specific job title\n• Company overview and mission\n• Key responsibilities (5-7 bullet points)\n• Required qualifications\n• Preferred qualifications\n• Salary range and benefits\n• Location and remote options\n• Reporting structure\n\n✨ **Best Practices:**\n• Use inclusive language\n• Be specific about day-to-day tasks\n• Highlight growth opportunities\n• Include company culture elements\n• Mention learning and development\n• Keep it concise but comprehensive\n\n❌ **Avoid:**\n• Unrealistic qualification lists\n• Vague responsibilities\n• Discriminatory language",
    
    "How can I attract better candidates?": "Strategies to attract top talent:\n\n🎯 **Compelling Job Postings:**\n• Write engaging job titles\n• Highlight unique company benefits\n• Show career growth opportunities\n• Include employee testimonials\n\n💰 **Competitive Compensation:**\n• Research market rates\n• Offer comprehensive benefits\n• Consider non-monetary perks\n• Be transparent about salary\n\n🏢 **Company Branding:**\n• Maintain strong online presence\n• Showcase company culture\n• Highlight diversity and inclusion\n• Share employee success stories\n\n📈 **Multi-Channel Approach:**\n• Post on multiple job boards\n• Leverage social media\n• Employee referral programs\n• Industry networking events",
    
    "What are effective interview techniques?": "Interview best practices:\n\n🎯 **Preparation:**\n• Review candidate's resume thoroughly\n• Prepare behavioral questions\n• Create consistent evaluation criteria\n• Plan interview structure and timeline\n\n❓ **Question Types:**\n• Behavioral: 'Tell me about a time when...'\n• Situational: 'How would you handle...'\n• Technical: Role-specific skills assessment\n• Cultural fit: Values and work style\n\n🤝 **During Interview:**\n• Create welcoming environment\n• Listen actively and take notes\n• Allow candidate to ask questions\n• Explain next steps clearly\n\n📊 **Evaluation:**\n• Use standardized scoring system\n• Focus on job-relevant criteria\n• Avoid unconscious bias\n• Document feedback promptly",
    
    "How do I assess candidate skills?": "Comprehensive skill assessment methods:\n\n🔍 **Technical Skills:**\n• Practical work samples or portfolio review\n• Skills-based tests or coding challenges\n• Scenario-based questions\n• Reference checks with previous employers\n\n🧠 **Soft Skills:**\n• Behavioral interview questions\n• Group interview or team interaction\n• Communication during interview process\n• Problem-solving scenarios\n\n📊 **Assessment Tools:**\n• Structured interview scorecards\n• Skills testing platforms\n• Personality assessments (when relevant)\n• Trial projects or assignments\n\n✅ **Best Practices:**\n• Assess skills relevant to actual job tasks\n• Use multiple assessment methods\n• Provide clear instructions and expectations\n• Give candidates opportunity to demonstrate abilities",

    "How to conduct remote interviews?": "Remote interview best practices:\n\n💻 **Technical Setup:**\n• Test video/audio beforehand\n• Ensure stable internet connection\n• Use professional background\n• Have backup communication method\n\n📋 **Interview Structure:**\n• Send clear joining instructions\n• Start with technical check\n• Allow extra time for potential issues\n• Record session (with permission)\n\n🎯 **Engagement Tips:**\n• Maintain eye contact with camera\n• Use screen sharing for presentations\n• Ask about remote work experience\n• Discuss communication preferences\n\n🤝 **Evaluation Considerations:**\n• Assess digital communication skills\n• Test adaptability to tech issues\n• Evaluate self-motivation indicators\n• Consider time zone compatibility",

    "What benefits should I offer?": "Competitive benefits package ideas:\n\n🏥 **Health & Wellness:**\n• Health insurance (medical, dental, vision)\n• Mental health support\n• Wellness programs\n• Gym memberships or fitness reimbursement\n\n⏰ **Time Off:**\n• Paid vacation days\n• Sick leave\n• Personal days\n• Parental leave\n• Sabbatical options\n\n💼 **Professional Development:**\n• Training budget\n• Conference attendance\n• Tuition reimbursement\n• Certification support\n• Mentorship programs\n\n🏠 **Work-Life Balance:**\n• Flexible work arrangements\n• Remote work options\n• Flexible scheduling\n• Childcare assistance\n• Employee assistance programs",

    "How to write an attractive job title?": "Job title best practices:\n\n✨ **Key Elements:**\n• Be specific and accurate\n• Use industry-standard terms\n• Include seniority level (Junior, Senior, Lead)\n• Avoid internal jargon or code names\n\n🎯 **Examples:**\n• Instead of 'Marketing Guru' → 'Digital Marketing Manager'\n• Instead of 'Code Ninja' → 'Senior Software Developer'\n• Instead of 'Sales Rock Star' → 'Business Development Representative'\n\n🔍 **SEO Considerations:**\n• Use keywords candidates search for\n• Match common job search terms\n• Consider location if relevant\n• Keep under 60 characters for optimal display\n\n❌ **Avoid:**\n• Overly creative or cute titles\n• Internal abbreviations\n• Discriminatory language\n• Misleading seniority levels",

    "How to screen resumes effectively?": "Resume screening strategy:\n\n⚡ **Quick Initial Scan (30 seconds):**\n• Check required qualifications\n• Look for relevant experience\n• Note career progression\n• Check for obvious red flags\n\n🔍 **Detailed Review:**\n• Assess skill alignment\n• Review employment gaps\n• Look for quantified achievements\n• Check education requirements\n\n📊 **Screening Criteria:**\n• Create standardized checklist\n• Weight must-have vs. nice-to-have qualifications\n• Consider transferable skills\n• Look for growth potential\n\n🤖 **Tools & Tips:**\n• Use ATS keyword filtering\n• Create scoring rubric (1-5 scale)\n• Avoid unconscious bias\n• Document screening decisions\n• Consider diverse backgrounds and experiences",

    "What legal considerations should I know?": "Key legal considerations for hiring:\n\n⚖️ **Discrimination Laws:**\n• Equal Employment Opportunity (EEO)\n• Avoid questions about age, religion, marital status\n• Focus on job-related qualifications only\n• Ensure consistent interview process\n\n📋 **Documentation:**\n• Keep detailed hiring records\n• Document reasons for decisions\n• Maintain confidentiality\n• Follow data protection regulations\n\n💼 **Employment Terms:**\n• Clearly define employment status\n• Specify compensation and benefits\n• Include non-disclosure agreements if needed\n• Outline termination procedures\n\n🔍 **Background Checks:**\n• Get written consent\n• Follow Fair Credit Reporting Act (FCRA)\n• Provide adverse action notices if needed\n• Ensure relevance to job role\n\n⚠️ **Disclaimer:** Consult with employment attorney for specific legal advice"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userType && !userName && !showNameInput) {
      setTimeout(() => {
        setMessages([{
          text: `Hi there! Welcome to Happy Globe Assistant for ${userType === 'jobSeeker' ? 'Job Seekers' : 'Employers'}. What's your name?`,
          sender: 'bot'
        }]);
        setShowNameInput(true);
      }, 1000);
    }
  },);

  const handleSend = () => {
    if (!input.trim()) return;

    if (showNameInput && !userName) {
      setUserName(input.trim());
      setMessages(prev => [
        ...prev,
        { text: input, sender: 'user' },
        { 
          text: `Nice to meet you, ${input.trim()}! I'm here to help you with ${userType === 'jobSeeker' ? 'your job search' : 'your hiring needs'}. Feel free to ask me anything or choose from the quick questions below.`, 
          sender: 'bot' 
        }
      ]);
      setShowNameInput(false);
      setInput('');
      return;
    }

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = responses[input];
      
      if (!response) {
        // Intelligent fallback responses
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('salary') || lowerInput.includes('pay') || lowerInput.includes('money')) {
          response = userType === 'jobSeeker' ? responses["How do I negotiate salary?"] : responses["What benefits should I offer?"];
        } else if (lowerInput.includes('interview')) {
          response = userType === 'jobSeeker' ? responses["What are common interview questions?"] : responses["What are effective interview techniques?"];
        } else if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
          response = userType === 'jobSeeker' ? responses["How can I improve my resume?"] : responses["How to screen resumes effectively?"];
        } else if (lowerInput.includes('remote') || lowerInput.includes('work from home')) {
          response = userType === 'jobSeeker' ? responses["How to search for remote jobs?"] : responses["How to conduct remote interviews?"];
        } else {
          const suggestions = userType === 'jobSeeker' ? jobSeekerQuestions.slice(0, 3) : employerQuestions.slice(0, 3);
          response = `I'm not sure about that specific question, ${userName || 'there'}. However, I can help you with these common topics:\n\n${suggestions.map(q => `• ${q}`).join('\n')}\n\nFeel free to ask about any of these, or contact our support team for more specific questions!`;
        }
      }
      
      setIsTyping(false);
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 1000 + Math.random() * 1000); // Variable delay for more natural feel
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const resetChat = () => {
    setMessages([]);
    setUserType(null);
    setUserName('');
    setShowNameInput(false);
    setInput('');
  };

  if (!userType) {
    return (
      <div className={`chatbot-container shadow-lg rounded-3 ${isMinimized ? 'minimized' : ''}`}>
        <div className="chatbot-header bg-gradient-primary text-white p-3 rounded-top d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">🌍 Happy Globe Assistant</h5>
            <small>Your AI-powered career companion</small>
          </div>
          <button 
            className="btn btn-sm btn-outline-light"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? '📱' : '➖'}
          </button>
        </div>
        {!isMinimized && (
          <div className="chatbot-body p-4 text-center">
            <div className="mb-3">
              <h6 className="text-muted mb-3">Welcome! I'm here to help. Are you a...</h6>
            </div>
            <div className="d-grid gap-2">
              <button 
                className="btn btn-success btn-lg"
                onClick={() => setUserType('jobSeeker')}
              >
                🔍 Job Seeker
                <small className="d-block text-light">Looking for opportunities</small>
              </button>
              <button 
                className="btn btn-info btn-lg"
                onClick={() => setUserType('employer')}
              >
                🏢 Employer
                <small className="d-block text-light">Hiring talent</small>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`chatbot-container shadow-lg rounded-3 ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-header bg-gradient-primary text-white p-3 rounded-top d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">
            🌍 Happy Globe Assistant
            {userName && <span className="ms-2">- Hi {userName}!</span>}
          </h5>
          <small>
            {userType === 'jobSeeker' ? '🔍 Job Seeker Help' : '🏢 Employer Help'}
          </small>
        </div>
        <div>
          <button 
            className="btn btn-sm btn-outline-light me-2"
            onClick={resetChat}
            title="Start over"
          >
            🔄
          </button>
          <button 
            className="btn btn-sm btn-outline-light"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? '📱' : '➖'}
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="chatbot-body p-3">
          <div className="messages-container mb-3" style={{ height: '400px', overflowY: 'auto' }}>
            {messages.length === 0 ? (
              <div className="text-center text-muted p-4">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Starting conversation...</p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`message-bubble ${msg.sender === 'user' ? 'user-message' : 'bot-message'} mb-3`}
                  >
                    <div className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                      <div className={`message-content ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light'} p-3 rounded-3`} style={{ maxWidth: '85%' }}>
                        {msg.sender === 'bot' && <div className="text-primary fw-bold mb-1">🤖 Assistant</div>}
                        <div style={{ whiteSpace: 'pre-line', lineHeight: '1.5' }}>
                          {msg.text}
                        </div>
                        <small className={`d-block mt-1 ${msg.sender === 'user' ? 'text-light' : 'text-muted'}`}>
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="message-bubble bot-message mb-3">
                    <div className="d-flex justify-content-start">
                      <div className="message-content bg-light p-3 rounded-3">
                        <div className="text-primary fw-bold mb-1">🤖 Assistant</div>
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {!showNameInput && messages.length > 0 && !isTyping && (
                  <div className="quick-questions mt-4">
                    <h6 className="text-muted mb-3">💡 Quick questions you might have:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {(userType === 'jobSeeker' ? jobSeekerQuestions : employerQuestions)
                        .slice(0, 5)
                        .map((q, i) => (
                          <button
                            key={i}
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleQuickQuestion(q)}
                          >
                            {q}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={showNameInput ? "Please enter your name..." : "Type your question..."}
              disabled={isTyping}
            />
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
            >
              {isTyping ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
          
          <div className="text-center mt-2">
            <small className="text-muted">
              💬 Ask me anything about {userType === 'jobSeeker' ? 'job searching' : 'hiring'} • Powered by Happy Globe AI
            </small>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .chatbot-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          background: white;
          border: 1px solid #e9ecef;
        }
        
        .chatbot-container.minimized {
          height: auto;
        }
        
        .bg-gradient-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }
        
        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background-color: #6c757d;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing {
          0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .message-content {
          position: relative;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .messages-container {
          scrollbar-width: thin;
          scrollbar-color: #6c757d transparent;
        }
        
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .messages-container::-webkit-scrollbar-thumb {
          background-color: #6c757d;
          border-radius: 3px;
        }
        
        .quick-questions .btn {
          white-space: normal;
          text-align: left;
          line-height: 1.2;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
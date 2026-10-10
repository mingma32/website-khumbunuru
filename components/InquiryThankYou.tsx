import {CheckCircle2} from 'lucide-react';

export default function InquiryThankYou(){
  return <>
    <span className="inquiry-success-icon"><CheckCircle2 size={42} aria-hidden="true"/></span>
    <p className="eyebrow">INQUIRY SUBMITTED</p>
    <h2 id="inquiry-thanks-title">Thank you for filling out the form.</h2>
    <p>Your inquiry has been submitted for processing. We’ll reply to the email address you provided.</p>
    <p className="form-note">A consultation is confirmed once we reply and agree on a time.</p>
    <div className="button-row"><a className="button primary" href="/contact#inquiry-form">Send another inquiry</a><a className="button secondary" href="/services">Explore services</a></div>
  </>;
}

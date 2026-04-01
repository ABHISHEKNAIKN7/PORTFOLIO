import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Pencil, Plus, X } from 'lucide-react';
import { trackLinkClick } from '../../utils/analytics';

const emptyForm = {
  id: '',
  title: '',
  issuer: '',
  date: '',
  type: '',
  description: '',
  link: '',
};

const getCertificateUrl = (certificate) => certificate.link || '#';

const getCertificatePreviewType = (certificate) => {
  const url = getCertificateUrl(certificate).toLowerCase();

  if (url.endsWith('.pdf')) {
    return 'pdf';
  }

  if (/\.(png|jpg|jpeg|webp|gif|svg)$/.test(url)) {
    return 'image';
  }

  return 'external';
};

const CertificateCard = ({ certificate, index, onEdit, onPreview }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="glass-card rounded-[2rem] border border-theme p-6 md:p-7 relative overflow-hidden cursor-pointer"
      onClick={() => onPreview(certificate)}
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(170,59,255,0.14),transparent_72%)] pointer-events-none" />

      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(170,59,255,0.28)] bg-[rgba(170,59,255,0.08)] text-[#aa3bff]">
            <Award size={20} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-theme-secondary">{certificate.type}</p>
            <h3 className="mt-2 text-xl font-bold text-theme-primary">{certificate.title}</h3>
            <p className="mt-2 text-theme-secondary">{certificate.issuer} • {certificate.date}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onEdit(certificate);
          }}
          className="text-theme-secondary hover:text-[#aa3bff] transition-colors inline-flex items-center gap-2 text-sm"
        >
          <Pencil size={16} />
          Edit
        </button>
      </div>

      <p className="text-theme-secondary leading-7">{certificate.description}</p>

      <div className="mt-6 pt-4 border-t border-theme">
        <a
          href={getCertificateUrl(certificate)}
          target={getCertificatePreviewType(certificate) === 'external' ? '_blank' : undefined}
          rel={getCertificatePreviewType(certificate) === 'external' ? 'noopener noreferrer' : undefined}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onPreview(certificate);
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-theme-secondary hover:text-[#00f0ff] transition-colors"
        >
          <ExternalLink size={16} />
          Preview Certificate
        </a>
      </div>
    </motion.div>
  );
};

const Certificates = ({ certificates = [], onAddCertificate, onUpdateCertificate }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [formValues, setFormValues] = useState(emptyForm);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const selectedPreviewType = useMemo(
    () => (selectedCertificate ? getCertificatePreviewType(selectedCertificate) : 'external'),
    [selectedCertificate]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const certificatePayload = {
      id: formValues.id || `certificate-${formValues.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`,
      title: formValues.title.trim(),
      issuer: formValues.issuer.trim(),
      date: formValues.date.trim(),
      type: formValues.type.trim(),
      description: formValues.description.trim(),
      link: formValues.link.trim() || '#',
    };

    if (editingId) {
      onUpdateCertificate(certificatePayload);
    } else {
      onAddCertificate(certificatePayload);
    }

    setFormValues(emptyForm);
    setEditingId('');
    setIsAdding(false);
  };

  const handleEdit = (certificate) => {
    setEditingId(certificate.id);
    setFormValues(certificate);
    setIsAdding(true);
  };

  const handleToggle = () => {
    setIsAdding((current) => {
      const next = !current;
      if (!next) {
        setEditingId('');
        setFormValues(emptyForm);
      }
      return next;
    });
  };

  const handlePreview = (certificate) => {
    const previewType = getCertificatePreviewType(certificate);
    const certificateUrl = getCertificateUrl(certificate);

    trackLinkClick({
      label: certificate.title,
      href: certificateUrl,
      section: 'certificates',
    });

    if (previewType === 'external') {
      window.open(certificateUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    setSelectedCertificate(certificate);
  };

  return (
    <section id="certificates" className="w-full py-24 px-6 md:px-12 flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-x-0 top-20 mx-auto h-72 w-[75%] rounded-full bg-[radial-gradient(circle,rgba(170,59,255,0.08),transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Certificates & <span className="text-glow-purple text-[#aa3bff]">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#aa3bff] to-[#00f0ff] mx-auto rounded-full" />
        </motion.div>

        <div className="flex justify-center mb-10">
          <button
            type="button"
            onClick={handleToggle}
            className="flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-theme text-theme-primary hover:border-[rgba(170,59,255,0.45)] transition-colors"
          >
            {isAdding ? <X size={18} /> : <Plus size={18} />}
            <span>{isAdding ? 'Close Certificate Form' : 'Add Certificate'}</span>
          </button>
        </div>

        {isAdding && (
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-theme mb-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input name="title" value={formValues.title} onChange={handleChange} required placeholder="Certificate title" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <input name="issuer" value={formValues.issuer} onChange={handleChange} required placeholder="Issuer / Organization" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <input name="date" value={formValues.date} onChange={handleChange} required placeholder="2025" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <input name="type" value={formValues.type} onChange={handleChange} required placeholder="Internship / Course" className="input-theme rounded-xl px-4 py-3 focus:outline-none" />
              <textarea name="description" value={formValues.description} onChange={handleChange} required rows="4" placeholder="Certificate description" className="md:col-span-2 input-theme rounded-xl px-4 py-3 focus:outline-none resize-none" />
              <div className="md:col-span-2">
                <input name="link" value={formValues.link} onChange={handleChange} placeholder="/certificates/redynox.pdf or /certificates/course.png" className="w-full input-theme rounded-xl px-4 py-3 focus:outline-none" />
                <p className="mt-2 text-sm text-theme-secondary">
                  Add your PDF or image inside `public/certificates/` and paste the path here, for example `/certificates/my-certificate.pdf`.
                </p>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                  {editingId ? 'Update Certificate' : 'Save Certificate'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id || certificate.title}
              certificate={certificate}
              index={index}
              onEdit={handleEdit}
              onPreview={handlePreview}
            />
          ))}
        </div>
      </div>

      {selectedCertificate && (
        <div className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md flex items-center justify-center px-4 py-10">
          <div className="glass-card w-full max-w-5xl rounded-[2rem] border border-theme p-4 md:p-6 relative">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-theme-secondary">{selectedCertificate.type}</p>
                <h3 className="mt-2 text-2xl font-bold text-theme-primary">{selectedCertificate.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-theme text-theme-primary hover:text-[#00f0ff] hover:border-[#00f0ff] transition-colors"
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className="rounded-[1.5rem] overflow-hidden border border-theme bg-[rgba(0,0,0,0.22)] min-h-[65vh]">
              {selectedPreviewType === 'pdf' && (
                <iframe
                  src={getCertificateUrl(selectedCertificate)}
                  title={selectedCertificate.title}
                  className="w-full h-[70vh]"
                />
              )}

              {selectedPreviewType === 'image' && (
                <img
                  src={getCertificateUrl(selectedCertificate)}
                  alt={selectedCertificate.title}
                  className="w-full h-[70vh] object-contain bg-[rgba(0,0,0,0.25)]"
                />
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <a
                href={getCertificateUrl(selectedCertificate)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-theme text-theme-primary hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors"
              >
                <ExternalLink size={16} />
                Open in New Tab
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;

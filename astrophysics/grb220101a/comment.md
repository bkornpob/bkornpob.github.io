L455 (in version1.tex)
```
Plugging in values from Table \ref{tab:pars_tophat} at $\xi=0.1$, $\nu_{\rm sa}\simeq6$ MHz; estimated values are even lower for higher $\xi$. However, in the case of a burst with a high surrounding ISM density, at early times one might expect some lower-energy radio frequencies to be below $\nu_{\rm sa}$, where self-absorption would be important (cites).
```
i think we can use citation here.

---

L646
`However, the \textit{observed} post-break achromatic slope is $-2.99\pm0.10$ -- higher at least by 6-7$\sigma$ than the $p$ from model fits.`

i think this refers to Figure 2, and the explanation is section 3.1. it is not clear to me how this value (and particularly the error) was computed. 

from my understanding now, it looks like using six data points in Figure 2. it is not clear if using the six data points as one dataset? or as two datasets (like pre-break)? a few sentences explaining this will be helpful.

---

section 3.3. analytical fit
the reasons bringing this analysis in are
> afterglowpy lacks wind-type CSM
> afterglowpy not incorporate synchrotron self-absorption (ssa)

and for comparison, the analytical model is configured
> top-hat model (this is understandable since ξ=1 with reduced-chi-sq=2.12 as min case)
> wind-type CSM
> incorporate ssa

i think what will help fill the gap is a discussion (or another quick analysis if possible, but just a few sentences should be understandable i think) to address how
> afterglowpy result may change if incorporating ssa, or
> can we do analytic model without ssa?

---




